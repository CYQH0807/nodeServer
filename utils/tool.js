const format = ({
    resCode = 0,
    status = 200,
    success = true,
    msg = 'success',
    data = {}
}) => {
    return {
        resCode,
        msg,
        data,
        status,
        success
    }
}





module.exports = {
    format
}