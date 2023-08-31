import {
    UPDATE_STREAM_BY_ID_PUT_TYPE,
    selectErrorByActionNames,
    selectIsLoadingByActionNames,
} from '../../../../redux'

export const selectUpdateStreamByIDLoading = selectIsLoadingByActionNames([
    UPDATE_STREAM_BY_ID_PUT_TYPE,
])

export const selectUpdateStreamByIDError = selectErrorByActionNames([
    UPDATE_STREAM_BY_ID_PUT_TYPE,
])
