/*  
    Author: jubaer hossain
    Email:  jubaer01.cse@gmail.com
    Date: 2023-02-09
*/
const JTCP = require('./src/jtcp')
const JUDP = require('./src/judp')

const { ZKError , ERROR_TYPES } = require('./src/exceptions/handler')

class ZKJUBAER {
    constructor(ip, port, timeout , inport){
        this.connectionType = null

        this.jtcp = new JTCP(ip,port,timeout) 
        this.judp = new JUDP(ip,port,timeout , inport) 
        this.interval = null 
        this.timer = null
        this.isBusy = false
        this.ip = ip
    }

    async functionWrapper (tcpCallback, udpCallback , command ){
        switch(this.connectionType){
            case 'tcp':
                if(this.jtcp.socket){
                    try{
                        const res =  await tcpCallback()
                        return res
                    }catch(err){
                        return Promise.reject(new ZKError(
                            err,
                            `[TCP] ${command}`,
                            this.ip
                        ))
                    }
                       
                }else{
                    return Promise.reject(new ZKError(
                        new Error( `Socket isn't connected !`),
                        `[TCP]`,
                        this.ip
                    ))
                }
            case 'udp':
                if(this.judp.socket){
                    try{
                        const res =  await udpCallback()
                        return res
                    }catch(err){
                        return Promise.reject(new ZKError(
                            err,
                            `[UDP] ${command}`,
                            this.ip
                        ))
                    }    
                }else{
                    return Promise.reject(new ZKError(
                        new Error( `Socket isn't connected !`),
                        `[UDP]`,
                        this.ip
                    ))
                }
            default:
                return Promise.reject(new ZKError(
                    new Error( `Socket isn't connected !`),
                    '',
                    this.ip
                ))
        }
    }

    async createSocket(cbErr, cbClose){
        try{
            if(!this.jtcp.socket){
                try{
                    await this.jtcp.createSocket(cbErr,cbClose)
                   

                }catch(err){
                    throw err;
                }
              
                try{
                    await this.jtcp.connect();
                    console.log('ok tcp')
                }catch(err){
                    throw err;
                }
            }      

            this.connectionType = 'tcp'

        }catch(err){
            try{
                await this.jtcp.disconnect()
            }catch(err){}

            if(err.code !== ERROR_TYPES.ECONNREFUSED){
                return Promise.reject(new ZKError(err, 'TCP CONNECT' , this.ip))
            }

            try {
                if(!this.judp.socket){
                    await this.judp.createSocket(cbErr, cbClose)
                    await this.judp.connect()
                }   
                
                console.log('ok udp')
                this.connectionType = 'udp'
            }catch(err){



                if(err.code !== 'EADDRINUSE'){
                    this.connectionType = null
                    try{
                        await this.judp.disconnect()
                        this.judp.socket = null
                        this.jtcp.socket = null
                    }catch(err){}


                    return Promise.reject(new ZKError(err, 'UDP CONNECT' , this.ip))
                }else{
                    this.connectionType = 'udp'
                    
                }
                
            }
        }
    }

    async getUsers(){
        return await this.functionWrapper(
            ()=> this.jtcp.getUsers(),
            ()=> this.judp.getUsers()
        )
    }

    async getTime(){
        return await this.functionWrapper(
            ()=> this.jtcp.getTime(),
            ()=> this.judp.getTime()
        )
    }
    async getSerialNumber(){
        return await this.functionWrapper(
            ()=> this.jtcp.getSerialNumber()
        )
    }

    async getDeviceVersion(){
        return await this.functionWrapper(
            ()=> this.jtcp.getDeviceVersion()
        )
    }
    async getDeviceName(){
        return await this.functionWrapper(
            ()=> this.jtcp.getDeviceName()
        )
    }
    async getPlatform(){
        return await this.functionWrapper(
            ()=> this.jtcp.getPlatform()
        )
    }
    async getOS(){
        return await this.functionWrapper(
            ()=> this.jtcp.getOS()
        )
    }
    async getWorkCode(){
        return await this.functionWrapper(
            ()=> this.jtcp.getWorkCode()
        )
    }
    async getPIN(){
        return await this.functionWrapper(
            ()=> this.jtcp.getPIN()
        )
    }
    async getFaceOn(){
        return await this.functionWrapper(
            ()=> this.jtcp.getFaceOn()
        )
    }
    async getSSR(){
        return await this.functionWrapper(
            ()=> this.jtcp.getSSR()
        )
    }
    async getFirmware(){
        return await this.functionWrapper(
            ()=> this.jtcp.getFirmware()
        )
    }
    async setUser(uid, userid, name, password, role = 0, cardno = 0){
        return await this.functionWrapper(
            ()=> this.jtcp.setUser(uid, userid, name, password, role, cardno)
        )
    }

    async getAttendanceSize(){
        return await this.functionWrapper(
            ()=> this.jtcp.getAttendanceSize()
        )
    }

    async getAttendances(cb){
        return await this.functionWrapper(
            ()=> this.jtcp.getAttendances(cb),
            ()=> this.judp.getAttendances(cb),
        )
    }

    async getRealTimeLogs(cb){
        return await this.functionWrapper(
            ()=> this.jtcp.getRealTimeLogs(cb),
            ()=> this.judp.getRealTimeLogs(cb)
        )
    }

    async disconnect(){
        return await this.functionWrapper(
            ()=> this.jtcp.disconnect(),
            ()=> this.judp.disconnect()
        )
    }

    async freeData(){
        return await this. functionWrapper(
            ()=> this.jtcp.freeData(),
            ()=> this.judp.freeData()
        )
    }


    async disableDevice(){
        return await this. functionWrapper(
            ()=>this.jtcp.disableDevice(),
            ()=>this.judp.disableDevice()
        )
    }


    async enableDevice(){
        return await this.functionWrapper(
            ()=>this.jtcp.enableDevice(),
            ()=> this.judp.enableDevice()
        )
    }


    async getInfo(){
        return await this.functionWrapper(
            ()=> this.jtcp.getInfo(),
            ()=>this.judp.getInfo()
        )
    }


    async getSocketStatus(){
        return await this.functionWrapper(
            ()=>this.jtcp.getSocketStatus(),
            ()=> this.judp.getSocketStatus()
        )
    }

    async clearAttendanceLog(){
        return await this.functionWrapper(
            ()=> this.jtcp.clearAttendanceLog(),
            ()=> this.judp.clearAttendanceLog()
        )
    }

    async executeCmd(command, data=''){
        return await this.functionWrapper(
            ()=> this.jtcp.executeCmd(command, data),
            ()=> this.judp.executeCmd(command , data)
        )
    }

    setIntervalSchedule(cb , timer){
        this.interval = setInterval(cb, timer)
    }


    setTimerSchedule(cb, timer){
        this.timer = setTimeout(cb,timer)
    }

    

}


module.exports = ZKJUBAER




