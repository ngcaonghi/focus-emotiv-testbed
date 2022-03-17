import {cid, programScid, logScid} from './Constants.js';

export function writeCommand(cidName, scidName, data=[0]) {
    var command = new Int8Array(6);
    command[0] = cid[cidName];
    if (cidName=='program') {
        command[1] = programScid[scidName];
    } else if (cidName=='log') {
        command[1] = logScid[scidName];
    } else if (cidName=='sleep'){
        command[1] = 0;
    } else {
        throw 'Only supports program, log, or sleep cid.';
    }   
    for (let i = 0; i < data.length; i++) {
        command[2 + i] = data[i];
    }

    return command;
}