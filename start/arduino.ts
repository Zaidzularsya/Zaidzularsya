const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
crimson: "\x1b[38m" // Scarlet
},
bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m"
}
};

console.log("[ "+colours.fg.blue+"info"+colours.reset+" ]  running arduino serial communication...")


try{
    const SerialPort = require('serialport')
    const Readline = require('@serialport/parser-readline')
    const parser = new Readline()
    const port = new SerialPort('COM3',
        {baudRate:9600} ,
        function (err) {
            if (err) {

                return console.log("[ "+colours.fg.yellow+"arduino"+colours.reset+" ]  COM3 not found, please plug arduino device...")

            }
        }
        )


    port.pipe(parser)
    parser.on('data', (_data)=>{
        if(_data != ''){
            console.log("message from device: ",_data)
        }
    })

    port.on('open',function(err){
        if(err){
            console.log("Open port is failed : ", err.message)
        }
        setTimeout(()=>{
            port.write("LED ON");
        },3000)

        setTimeout(()=>{
            port.write("LED OFF");
        },6000)
        
    })
    setTimeout(()=>{
            console.log("delay")
        },10000)
    port.on('open',function(err){
        if(err){
            console.log("Open port is failed : ", err.message)
        }
        setTimeout(()=>{
            port.write("LED ON");
        },11000)

        setTimeout(()=>{
            port.write("LED OFF");
        },15000)
        
    })
}catch(e){
    console.log("[ "+colours.fg.red+"info"+colours.reset+" ]  arduino not pluged...")
    console.log(e)
}finally {
    console.log("finally")
}



