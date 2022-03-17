export const tDCSService = '0000aab0-f845-40fa-995d-658a43feea4c';
export const characteristics = {
    'command' : '0000aab1-f845-40fa-995d-658a43feea4c',
    'response' : '0000aab2-f845-40fa-995d-658a43feea4c',
    'buffer' : '0000aab3-f845-40fa-995d-658a43feea4c',
    'actual_current' : '0000aab4-f845-40fa-995d-658a43feea4c',
    'remaining_time' : '0000aab6-f845-40fa-995d-658a43feea4c'
}
export const cid = {
    'sleep' : 0,
    'program' : 2,
    'log' : 3
}
export const programScid = {
    'getMaxNumPg' : 0,
    'getValNumPg' : 1,
    'getStatus' : 2,
    'read' : 3,
    'write' : 4,
    'enable' : 5,
    'disable' : 6,
    'start' : 7,
    'stop' : 8
}
export const logScid = {
    'getNum' : 0,
    'getSize' : 1,
    'getFile' : 3,
    'del' : 4,
    'stop' : 5
}
export const confirmResponse = '00002902-0000-1000-8000-00805f9b34fb';