export default class PatientView {
    constructor(createPaciente, removerPaciente) {
        this.getElements();
        this.createPaciente = createPaciente;
        this.removerPaciente = removerPaciente;
    }

    init() {
        this.validateElements();
        this.bindEvents();
    }

    getElements() {
        this.pacientesContainer = document.querySelector(".container-grid-cards-pacientes");
        this.pacienteBtn = document.querySelector("#paciente-btn");
        this.modalPaciente = document.querySelector("#modal-novo-paciente");
        this.closeModalButtons = document.querySelectorAll("[data-close-modal]");
        this.pacientesHeader = document.querySelector(".header-pacientes");
        this.formPaciente = document.querySelector("#form-novo-paciente")
        this.pacientesContainerInfoCards = document.querySelector(".container-informacoes");
        this.filtrobtn = document.querySelector("#btn-filtro");
        this.asideToggle = document.querySelector("#aside-toggle");
    }

    getPacienteFormData() {
        const formData = new FormData(this.formPaciente);

        return {
            name: formData.get("patientName").trim(),
            age: Number(formData.get("patientAge")),
            location: formData.get("patientLocation").trim(),
            cpf: formData.get("patientCpf").trim(),
            phone: formData.get("patientPhone").trim(),
            status: formData.get("patientStatus"),
            doctor: formData.get("patientDoctor").trim()
        }
    }


    validateElements() {
        if (!this.pacientesContainer) {
            throw new Error("Elemento .container-grid-cards-pacientes não encontrado.");
        }

        if (!this.pacienteBtn) {
            throw new Error("Elemento #paciente-btn não encontrado.");
        }

        if (!this.modalPaciente) {
            throw new Error("Elemento #modal-novo-paciente não encontrado.");
        }

        if (!this.formPaciente) {
            throw new Error("Elemento #form-novo-paciente não encontrado.");
        }

        if (!this.pacientesContainerInfoCards) {
            throw new Error("Elemento .container-resumo-pacientes não encontrado.");
        }

        if (!this.filtrobtn) {
            throw new Error("Elemento #btn-filtro não encontrado.");
        }

        if (!this.asideToggle) {
            throw new Error("Elemento #aside-toggle não encontrado.");
        }
    }

    bindEvents() {
        this.pacienteBtn.addEventListener("click", () => {
            this.openModalPaciente();
        });

        this.closeModalButtons.forEach((button) => {
            button.addEventListener("click", () => {
                this.closeModalPaciente();
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                this.closeModalPaciente();
            }
        });

        this.asideToggle.addEventListener("click", this.asideOpenClose.bind(this));

        this.filtrobtn.addEventListener("click", this.filtroOpenClose.bind(this));

        this.formPaciente.addEventListener("submit", (event) => {
            event.preventDefault();
            const patientData = this.getPacienteFormData();
            this.createPaciente(patientData);
            this.formPaciente.reset();
            this.closeModalPaciente();
        });

        this.pacientesContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("btn-remove") || event.target.closest(".btn-remove")) {
                const btn = event.target.classList.contains("btn-remove") ? event.target : event.target.closest(".btn-remove");
                const patientId = btn.getAttribute("data-patient-id");
                this.removePacienteCard(patientId);
            }
        });
    }

    openModalPaciente() {
        this.modalPaciente.classList.remove("inativo");
        this.modalPaciente.setAttribute("aria-hidden", "false");
        this.pacienteBtn.setAttribute("aria-expanded", "true");
    }

    closeModalPaciente() {
        this.modalPaciente.classList.add("inativo");
        this.modalPaciente.setAttribute("aria-hidden", "true");
        this.pacienteBtn.setAttribute("aria-expanded", "false");
    }

    asideOpenClose() {
        const aside = document.querySelector(".aside-menu");
        const icon1 = document.querySelector(".aside-icon-open");
        const icon2 = document.querySelector(".aside-icon-fechado");

        aside.classList.toggle("inativo")
        icon1.classList.toggle("inativo")
        icon2.classList.toggle("inativo")
    }

    filtroOpenClose() {
        const containerFiltro = document.querySelector(".container-filtros");

        this.filtrobtn.classList.toggle("click");
        this.filtrobtn.classList.toggle("animar");
        containerFiltro.classList.toggle('inativo');

        this.filtrobtn.addEventListener("animationend", () => {
            this.filtrobtn.classList.remove("animar");
        }, { once: true });

    }

    removePacienteCard(patientId) {
        this.removerPaciente(patientId);
    }

    maskCpf(cpf) {
        const onlyNumbers = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (onlyNumbers.length !== 11) {
            return "CPF inválido";
        }

        return `***.***.***-${onlyNumbers.slice(-2)}`;
    }

    renderInfoCards(patients) {
        const pacientesTotal = this.pacientesContainerInfoCards.querySelector(".estado-total p");
        const pacientesCriticos = this.pacientesContainerInfoCards.querySelector(".estado-critico p");
        const pacientesUrgentes = this.pacientesContainerInfoCards.querySelector(".estado-urgente p");
        const pacientesObservacao = this.pacientesContainerInfoCards.querySelector(".estado-em-observacao p");
        const pacientesEstavel = this.pacientesContainerInfoCards.querySelector(".estado-estavel p");
        const pacienteHeaderParagraph = this.pacientesHeader.querySelector(".page-subtitle");

        const total = patients.length;
        const criticos = patients.filter(p => p.status === "critico").length;
        const urgentes = patients.filter(p => p.status === "urgente").length;
        const observacao = patients.filter(p => p.status === "em-observacao").length;
        const estavel = patients.filter(p => p.status === "estavel").length;

        pacientesTotal.textContent = total;
        pacienteHeaderParagraph.textContent =  `${total} de ${total} pacientes`; ;
        pacientesCriticos.textContent = criticos;
        pacientesUrgentes.textContent = urgentes;
        pacientesObservacao.textContent = observacao;
        pacientesEstavel.textContent = estavel;
    }

    renderPacientes(patients) {
        this.pacientesContainer.innerHTML = "";

        if (patients.length === 0) {
            this.pacientesContainer.innerHTML = `
                <h3 class="empty-message">Nenhum Paciente encontrado</h3>
            `;
            return;
        }

        patients.forEach(patient => {
            const card = this.createCardPatient(patient);
            this.pacientesContainer.appendChild(card);
        })
    }

    createCardPatient(patient) {
        const article = document.createElement("article");
        const maskedCpf = this.maskCpf(patient.cpf);

        const statusMap = {
            "critico": "Crítico",
            "urgente": "Urgente",
            "em-observacao": "Em Observação",
            "estavel": "Estável"
        };

        article.classList.add("card-paciente", `card-estado-${patient.status}`, `estado-${patient.status}`);

        article.innerHTML = `
            <header class="header-card-paciente">
                <div class="icon-paciente ${patient.status}">
                    <img src="src/assets/paciente.png" class="icone-paciente ${patient.status}" alt="icone de paciente">
                </div>
                <div>
                    <h2 class="paciente-name">${patient.name}</h2>
                    <p class="paciente-info">${patient.age} anos - ${patient.location}</p>
                </div>

                <button type="button" class="btn-remove" id="btnRemove" data-patient-id="${patient.id}">
                    &times;
                </button>
            </header>
            <div class="card-main">
                <div class="paciente-cpf">
                    <img src="src/assets/relatorio.png" alt="">
                    <p>${maskedCpf}</p>
                </div>
                <div class="paciente-estado">
                    <div class="bolinha ${patient.status}"></div>
                    <p>${statusMap[patient.status] || patient.status}</p>
                </div>
            </div>
            <footer class="footer-card-paciente">
                <p>${patient.phone || "sem telefone"}</p>
                <p class="data-paciente"><time datetime="2026-04-20">20/04/2026</time></p>
                <p>Atualizado há 20 min - Dr. ${patient.doctor}</p>
            </footer>
        `;

        return article
    }
}