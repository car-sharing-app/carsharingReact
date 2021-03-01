export const newData = (typeOfData, data) => {
    // console.log(data)
    return {
        type: typeOfData,
        passedValue: data
    }
}
