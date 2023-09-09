import { Apartment } from "../apartment.model";

export const mocksApartment : Apartment[] = [
    {
        id:'1',
        address:'la calle risa 1',
        description:'es muy risa 1',
        name:'la casita risa 1',
        numberOfBathrooms:1,
        numberOfBeds: 1,
        rooms:1,
        reviews:[
            {
                id:'als',
                comment:'estuvo risa',
                userName:'el risitas',
                date: '2020-20-02'
            }
        ]
    },
    {
        id:'2',
        address:'la calle risa 2',
        description:'es muy risa 2',
        name:'la casita risa 2',
        numberOfBathrooms:2,
        numberOfBeds: 2,
        rooms:2,
        reviews:[
            {
                id:'als',
                comment:'estuvo risa',
                userName:'el risitas',
                date: '2020-20-02'
            }
        ]
    },
    {
        id:'3',
        address:'la calle risa 3',
        description:'es muy risa 3',
        name:'la casita risa 3',
        numberOfBathrooms:3,
        numberOfBeds: 3,
        rooms:3,
        reviews:[
            {
                id:'als',
                comment:'estuvo risa',
                userName:'el risitas',
                date: '2020-20-02'
            }
        ]
    },
    {
        id:'4',
        address:'la calle risa 4',
        description:'es muy risa 4',
        name:'la casita risa 4',
        numberOfBathrooms:4,
        numberOfBeds: 4,
        rooms:4,
        reviews:[
            {
                id:'als',
                comment:'estuvo risa',
                userName:'el risitas',
                date: '2020-20-02'
            }
        ]
    }
]