import PatientView from "../view/PatientView.js";
import PatientLinkedList from "../model/PatientLinkedList.js";

export default class PatientController {
    constructor(){
        this.patientList = new PatientLinkedList();
        this.patientView = new PatientView(
            this.createPaciente.bind(this),
            this.removerPaciente.bind(this)
        );
    }

    init(){
        this.patientView.init()
        this.loadInitialPatients();
        this.render();
    }

    createPaciente(patient){
        const paciente = {
            id: crypto.randomUUID(),
            ...patient,
            createdAt: new Date().toISOString(),
        };
        this.patientList.inserirPaciente(paciente);
        this.render();
    }

    loadInitialPatients() {
        const patients = [
            {
                id: crypto.randomUUID(),
                name: "Ana Beatriz Oliveira",
                age: 30,
                location: "Ala C",
                cpf: "321.654.987-00",
                phone: "(11) 98765-4321",
                status: "estavel",
                doctor: "Richard Henrique",
                createdAt: "2026-04-20"
            },
            {
                id: crypto.randomUUID(),
                name: "Carlos Eduardo Silva",
                age: 45,
                location: "Ala A",
                cpf: "654.321.987-90",
                phone: "(11) 91234-5678",
                status: "urgente",
                doctor: "Richard Henrique",
                createdAt: "2026-04-20"
            },
            {
                id: crypto.randomUUID(),
                name: "Mariana Santos",
                age: 28,
                location: "Ala B",
                cpf: "987.654.321-00",
                phone: "(11) 99876-5432",
                status: "estavel",
                doctor: "Richard Henrique",
                createdAt: "2026-04-20"
            },
            {
                id: crypto.randomUUID(),
                name: "Lucas Pereira",
                age: 35,
                location: "Pronto Socorro",
                cpf: "123.456.789-00",
                phone: "(11) 98765-4321",
                status: "em-observacao",
                doctor: "Richard Henrique",
                createdAt: "2026-04-20"
            },
            {
                id: crypto.randomUUID(),
                name: "Fernanda Costa",
                age: 40,
                location: "UTI",
                cpf: "456.789.123-00",
                phone: "(11) 99876-5432",
                status: "critico",
                doctor: "Richard Henrique",
                createdAt: "2026-04-20"
            }
        ];

        patients.forEach((patient) => {
            this.patientList.inserirPaciente(patient);
        });
    }

    listarPacientes(){
        return this.patientList.listarPorChegada();
    }

    removerPaciente(id){
        const pacienteRemovido = this.patientList.removerPaciente(id);
        this.render();
        return pacienteRemovido;
    }

    render(){
        const patients = this.listarPacientes();

        this.patientView.renderInfoCards(patients);
        this.patientView.renderPacientes(patients);
    }
}