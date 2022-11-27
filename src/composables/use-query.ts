/* eslint-disable @typescript-eslint/ban-ts-comment */
export interface UseQueryOptions<D, F, P> {
  queryKey?: any[]
  queryFn?: F
  initialData?: D
  initialPickedData?: P
  fetchOnMount?: boolean
  pickOne?: string
  onSuccess?: (result: D) => void
  onError?: (error: any) => void
  onSettled?: () => void
}

export const useQuery = <D, F, P>(options: UseQueryOptions<D, F, P>) => {
  options = {
    initialData: undefined as D,
    fetchOnMount: true,
    pickOne: undefined,
    ...options,
  }

  const {
    queryKey,
    queryFn,
    pickOne,
    initialData,
    initialPickedData,
    onSuccess,
    onError,
    onSettled,
  } = options

  const keyToWatch = queryKey!.filter(key => isRef(key) || isReactive(key))
  const isLoading = ref(false)
  const isError = ref(false)
  const data = ref<D | undefined>(initialData)
  const pickedData = ref<P | undefined>(initialPickedData)
  const error = ref<any>(null)

  const handleError = (err: any) => {
    isError.value = true
    error.value = err
    onError?.(err)
  }

  const refetch = async () => {
    error.value = null

    try {
      isLoading.value = true
      isError.value = false
      // @ts-expect-error
      const res = await queryFn?.()
      // .catch(err => handleError(err))

      data.value = res ?? initialData

      if (pickOne)
      // @ts-expect-error
        pickedData.value = data.value[pickOne] ?? initialData

      onSuccess?.(data.value as D)
    }
    catch (err) {
      handleError(err)
    }
    finally {
      isLoading.value = false
      onSettled?.()
    }
  }

  watch(keyToWatch, () => refetch(), {
    immediate: options.fetchOnMount,
    deep: true,
  })

  return {
    data,
    pickedData,
    error,
    refetch,
    isLoading,
    isError,
  }
}
