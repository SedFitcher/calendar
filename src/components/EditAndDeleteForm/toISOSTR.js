export const toISOSTR = (isostr) => {
    var str = new Date(Date.parse(isostr)).toISOString()
    str = str.split('')
    for (var i = 0; i < 8; i++) {
        str.pop()
    }
    var res = ""
    for (var j = 0; j < str.length; j++) {
        res+=str[j]
    }
    return res
}

export const toIS = (str) => {
    var st = str.split('')
    if (st.length > 10) {
        for (var i = 0; i < 6; i++) {
            st.pop()
        }
    }else{
        st.push('T00:00')
    }
    var res = ""
    for (var j = 0; j < st.length; j++) {
        res+=st[j]
    }
    return res
}