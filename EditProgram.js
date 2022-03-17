import connectBLE from './ConnectBLE.js';
import { characteristics } from './Constants.js';
import { writeCommand } from './WriteCommand.js';


async function getConfigs(service, pgID, descID) {
    try {
        console.log('Getting command characteristic');
        const command = await 
                        service.getCharacteristic(characteristics['command']);
        console.log('Reading program config (Descriptor 1)');
        const readCommand = writeCommand('program', 'read', [pgID, descID]);
        await command.writeValue(readCommand);
        console.log('Get config');
        const dataBuffer = await 
                           service.getCharacteristic(characteristics['buffer']);
        const configs = await dataBuffer.readValue();
        return configs;
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

async function writeViaBuffer(service, value, writeCommand) {
    try {
        console.log('Write to data buffer');
        const bufferWriter = await 
        service.getCharacteristic(characteristics['buffer']);
        await bufferWriter.writeValue(value);

        console.log('Write program');
        const command = await
                        service.getCharacteristic(characteristics['command']); 
        await command.writeValue(writeCommand);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

async function enableProgram(service, pgID) {
    try {
        const command = await
                        service.getCharacteristic(characteristics['command']); 
        const enableCommand = writeCommand('program', 'enable', [pgID]);
        console.log(enableCommand);
        console.log('Enable program');
        await command.writeValue(enableCommand); 
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

export async function editName(pgID, name) {
    try {
        if (name.length > 9) {
            throw "Name length must be <= 9.";
        }
        const service = await connectBLE();
        const configs = await getConfigs(service, pgID, 0);
        const view8 = new Int8Array(configs.buffer);
        let encoder = new TextEncoder();
        const nameArray = encoder.encode(name);
        for (let i = 1; i < name.length + 1; i++) {
            view8[i] = nameArray[i - 1];
        }
        const pgWriteCommand = writeCommand('program', 'write', [pgID, 0]);
        await writeViaBuffer(service, view8, pgWriteCommand);
        await enableProgram(service, pgID);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

export async function editSham(pgID, sham) {
    try {
        const service = await connectBLE();
        const configs = await getConfigs(service, pgID, 0);
        const view8 = new Int8Array(configs.buffer);
        view8[13] = sham;
        const pgWriteCommand = writeCommand('program', 'write', [pgID, 0]);
        await writeViaBuffer(service, view8, pgWriteCommand);
        await enableProgram(service, pgID);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

export async function editCurrent(pgID, newCurrent, newOffset=0) {
    try {
        const service = await connectBLE();
        const configs = await getConfigs(service, pgID, 0);
        const view16 = new Int16Array(configs.buffer);
        view16[8] = parseInt(newCurrent * 1000);
        view16[9] = parseInt(newOffset * 1000);
        const view8 = new Int8Array(view16.buffer);
        const pgWriteCommand = writeCommand('program', 'write', [pgID, 0]);
        await writeViaBuffer(service, view8, pgWriteCommand);
        await enableProgram(service, pgID);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

export async function editMaxVoltage(pgID, maxV) {
    try {
        const service = await connectBLE();
        const configs = await getConfigs(service, pgID, 1);
        const view8 = new Int8Array(configs.buffer);
        view8[0] = maxV;
        const pgWriteCommand = writeCommand('program', 'write', [pgID, 1]);
        await writeViaBuffer(service, view8, pgWriteCommand);
        await enableProgram(service, pgID);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

export async function editBipolar(pgID, bipolar) {
    try {
        const service = await connectBLE();
        const configs = await getConfigs(service, pgID, 1);
        const view8 = new Int8Array(configs.buffer);
        view8[1] = bipolar;
        const pgWriteCommand = writeCommand('program', 'write', [pgID, 1]);
        await writeViaBuffer(service, view8, pgWriteCommand);
        await enableProgram(service, pgID);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}


export async function editFrequency(pgID, freq) {
    try {
        const service = await connectBLE();
        const configs = await getConfigs(service, pgID, 1);
        const view8 = new Int8Array(configs.buffer);
        const freqArray = new Int32Array([freq * 1000]);
        const freqBuffer = new Int8Array(freqArray.buffer);
        for (let i = 2; i < 6; i++) {
            view8[i] = freqBuffer[i - 2];
        }
        const pgWriteCommand = writeCommand('program', 'write', [pgID, 1]);
        await writeViaBuffer(service, view8, pgWriteCommand);
        await enableProgram(service, pgID);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

export async function editDutyCycle(pgID, duty) {
    try {
        const service = await connectBLE();
        const configs = await getConfigs(service, pgID, 1);
        const view8 = new Int8Array(configs.buffer);
        const freqArray = new Int32Array([duty * 1000]);
        const freqBuffer = new Int8Array(freqArray.buffer);
        for (let i = 6; i < 10; i++) {
            view8[i] = freqBuffer[i - 6];
        }
        const pgWriteCommand = writeCommand('program', 'write', [pgID, 1]);
        await writeViaBuffer(service, view8, pgWriteCommand);
        await enableProgram(service, pgID);
    } catch(error) {
        console.log('Argh! ' + error);
    }
}

