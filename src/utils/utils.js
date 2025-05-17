/** 
 * Valida que el param sea un string y que no este vacio
*/
export const validateStringParam = (param) => {
    try {
        return !param || param?.length === 0 ? undefined : param
    } catch (error) {
        return undefined
    }
}