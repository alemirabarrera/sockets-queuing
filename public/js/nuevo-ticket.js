//Referencias HTML
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const btnGenerarNuvoTk  = document.querySelector('.btn.btn-secondary.btn-lg');


const socket = io();

socket.on('connect', () => {    
    btnGenerarNuvoTk.disabled = false;
});
socket.on('disconnect', () => {
    btnGenerarNuvoTk.disabled = true;
});
socket.on('ultimo-ticket', (ultimo)=>{
    lblNuevoTicket.innerText = 'Ticket: '+ultimo;
})


btnGenerarNuvoTk.addEventListener( 'click', () => {
    socket.emit('siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});