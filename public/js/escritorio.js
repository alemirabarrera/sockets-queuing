//Referencias HTML
const lblescritorio  = document.querySelector('h1');
const btnAtender  = document.querySelector('button');
const lblTicket  = document.querySelector('small');
const divAlert  =  document.querySelector('.alert'); 
const lblPendientes = document.querySelector('#lblPendientes'); 

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get('escritorio');
lblescritorio.innerText = escritorio;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {    
    btnAtender.disabled = false;
});
socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('tickes-pendientes', (ticketsCount)=>{
    if(ticketsCount == 0){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.innerText = ticketsCount;
    }
});


btnAtender.addEventListener( 'click', () => {    
    socket.emit("atender-ticket", {escritorio}, ({ok, ticket, msg}) =>{
        if(!ok){
            lblTicket.innerText = "Nadie";
            return divAlert.style.display = '';            
        }
        lblTicket.innerText = "Ticket "+ticket.numero;
    });
 

});