import storageService from '../general/storage.service.js'
import utilService from '../general/util.service.js'
import LoremIpsum from '../general/loremIpsum.js'

const KEEPS_KEY = 'keeperAppKey';

function query() {
    return storageService.load(KEEPS_KEY)
        .then(keeps => {
            if (!keeps) {
                keeps = generateKeeps();
                storageService.store(KEEPS_KEY, keeps);
            }
            return keeps;
        })
}

function getKeepById(keepId) {
    return storageService.load(KEEPS_KEY)
        .then(keeps => {
            return keeps.find(keep => keep.id === keepId);
        })
}

function deleteKeep(keepId) {
    return storageService.load(KEEPS_KEY)
        .then(keeps => {
            var keepIdx = keeps.findIndex(keep => keep.id === keepId);
            keeps.splice(keepIdx, 1);
            return storageService.store(KEEPS_KEY, keeps);
        })
}


function saveKeep(keep, isTemp = false) {
    return storageService.load(KEEPS_KEY)
        .then(keeps => {
            if (keep.id && !isTemp) {
                keep.isTemp = false;
                var keepIdx = keeps.findIndex(currkeep => currkeep.id === keep.id)
                keeps.splice(keepIdx, 1, keep);
            } else {
                keep.isTemp = isTemp;
                keeps.unshift(keep);
            }
            return storageService.store(KEEPS_KEY, keeps);
        });
}

function generateKeeps() {
    var keeps = []
    for (let index = 0; index < 10; index++) {
        var keep = createKeep(index)
        keeps.push(keep)
    }
    return keeps;
}

function createKeep(idx){
    var types = ['noteType','listType','reminderType'];
    var notes = [['go to the supermarket'],['apointment with Dr'],['tomato','milk','butter','bread','butter']];
    var loremIpsum = new LoremIpsum();
    var keep = {
        id: utilService.getRandomString(11),
        type: types[utilService.getRandomInt(0, types.length)],
        title: loremIpsum.generate(utilService.getRandomInt(1, 5), utilService.getRandomInt(1, 4)),
        notes: notes[utilService.getRandomInt(0, notes.length)],
        imgs:[]
    }
    return keep;
}
export default {
    query,
    getKeepById,
    deleteKeep,
    saveKeep
}
