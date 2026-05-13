import PatientNode from "./PatientNode.js";

export default class PatientLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    inserirPaciente(patient) {
        const novoPaciente = new PatientNode(patient);

        if (this.head === null) {
            this.head = novoPaciente;
            this.length++;
            return;
        }

        let atual = this.head;

        while (atual.next !== null) {
            atual = atual.next;
        }

        atual.next = novoPaciente;
        this.length++;
    }

    removerPaciente(id) {
        if (this.head === null) {
            return null;
        }

        if (this.head.patient.id === id) {
            const removido = this.head.patient;
            this.head = this.head.next;
            this.length--;
            return removido;
        }

        let atual = this.head;

        while (atual.next !== null) {
            if (atual.next.patient.id === id) {
                const removido = atual.next.patient;
                atual.next = atual.next.next;
                this.length--;
                return removido;
            }

            atual = atual.next;
        }

        return null;
    }

    buscarPorId(id) {
        let atual = this.head;

        while (atual !== null) {
            if (atual.patient.id === id) {
                return atual.patient;
            }

            atual = atual.next;
        }

        return null;
    }

    listarPorChegada() {
        const pacientes = [];
        let atual = this.head;

        while (atual !== null) {
            pacientes.push(atual.patient);
            atual = atual.next;
        }

        return pacientes;
    }

    filtrarPorStatus(status) {
        if (status === "todos") {
            return this.listarPorChegada();
        }

        return this.listarPorChegada().filter((patient) => {
            return patient.status === status;
        });
    }

    buscarPorTexto(searchTerm) {
        const normalizedSearch = searchTerm.toLowerCase().trim();

        return this.listarPorChegada().filter((patient) => {
            return (
                patient.name.toLowerCase().includes(normalizedSearch) ||
                patient.cpf.includes(normalizedSearch) ||
                patient.location.toLowerCase().includes(normalizedSearch) ||
                patient.doctor.toLowerCase().includes(normalizedSearch)
            );
        });
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }
}