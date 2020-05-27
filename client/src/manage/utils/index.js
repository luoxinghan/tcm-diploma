export const filterData = (state, stateName) => (typeof state ==='object' ? state[stateName] : state);
export function testFilterData(state, stateName){
    console.log(state, stateName);
    console.log(typeof state==='object');
    console.log(state['main'])
}

export const deleObj = (obj, key) => {
    let obj2 = Object.assign({}, obj)
    delete obj2[key]
    return obj2
}
