const TicketContro = require("../models/ticket-control");

const ticketControl = new TicketContro();


const socketController = (socket) => {
    //cuando un cliente se conecta
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickes-pendientes', ticketControl.tickets.length);

    socket.on('siguiente-ticket', ( payload, callback ) => {        
        const siguiente = ticketControl.siguiente();        
        console.log(siguiente);
        callback(siguiente);
        //TODO: Notificar hay un nuevo ticket pendiente de asignar
        socket.broadcast.emit('tickes-pendientes', ticketControl.tickets.length);
    })

    socket.on('atender-ticket', ({escritorio}, callback)=>{
        if(!escritorio){
            return callback({
                ok:false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        socket.emit('tickes-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickes-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);

        if(!ticket){
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        }else{
            return callback({
                ok: true,
                ticket
            })
        }
    })
}



module.exports = {
    socketController
}

