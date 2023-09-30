import { MessageType } from '@/components/Bot'
import { sendRequest } from '@/utils/index'

export type IncomingInput = {
    question: string
    history: MessageType[]
    overrideConfig?: Record<string, unknown>
    socketIOClientId?: string
}

export type MessageRequest = {
    chatflowid: string
    apiHost?: string
    body?: IncomingInput
}

export const sendMessageQuery = ({ chatflowid, apiHost = 'http://35.238.21.52:3003', body }: MessageRequest) =>
    sendRequest<any>({
        method: 'POST',
        url: `${apiHost}/api/v1/prediction/${chatflowid}`,
        body
    })

export const isStreamAvailableQuery = ({ chatflowid, apiHost = 'http://35.238.21.52:3003' }: MessageRequest) =>
    sendRequest<any>({
        method: 'GET',
        url: `${apiHost}/api/v1/chatflows-streaming/${chatflowid}`,
    })
