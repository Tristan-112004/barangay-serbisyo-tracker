/* ============================================================
   Barangay Serbisyo Tracker – Demo Logic
   All data is fictional. No backend, database, or live APIs.
   ============================================================ */

/* ---------- Demo service data ---------- */
const SERVICES = [
  {
    name: "Barangay Clearance",
    description: "Official document for employment, business, or other legal purposes.",
    requirements: "Valid ID, Cedula"
  },
  {
    name: "Certificate of Residency",
    description: "Proof that the applicant resides in the barangay.",
    requirements: "Valid ID, Proof of billing"
  },
  {
    name: "Indigency Certificate",
    description: "Certification for residents who need financial assistance.",
    requirements: "Valid ID, Barangay certification"
  },
  {
    name: "Business Permit",
    description: "Permit for operating a business within the barangay.",
    requirements: "DTI registration, Lease contract, Valid ID"
  },
  {
    name: "Complaint Filing",
    description: "File a community complaint for mediation or action.",
    requirements: "Valid ID, Written complaint"
  }
];

/* ---------- Demo request store (in-memory only) ---------- */
const demoRequests = new Map();
let referenceCounter = 0;

/* ---------- Utility ---------- */
function generateReference() {
  referenceCounter += 1;
  const year = new Date().getFullYear();
  return `BRGY-${year}-${String(referenceCounter).padStart(4, "0")}`;
}

function showMessage(elementId, message, isError = false) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.classList.toggle("error", isError);
}

/* ---------- Render service cards ---------- */
function renderServices() {
  const container = document.getElementById("service-list");
  const select = document.getElementById("service-select");
  if (!container || !select) return;

  container.innerHTML = "";

  SERVICES.forEach((service, index) => {
    // Service card
    const card = document.createElement("article");
    card.className = "service-card";
    card.innerHTML = `
      <h3>${service.name}</h3>
      <p><span class="label">Description:</span> ${service.description}</p>
      <p><span class="label">Requirements:</span> ${service.requirements}</p>
    `;
    container.appendChild(card);

    // Dropdown option
    if (index > 0) {
      const option = document.createElement("option");
      option.value = service.name;
      option.textContent = service.name;
      select.appendChild(option);
    }
  });
}

/* ---------- Request form ---------- */
function setupRequestForm() {
  const form = document.getElementById("request-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("resident-name").value.trim();
    const service = document.getElementById("service-select").value;
    const purpose = document.getElementById("purpose").value.trim();

    // Basic validation
    if (!name || !service || !purpose) {
      showMessage("request-result", "Please complete all required fields before submitting.", true);
      return;
    }

    const reference = generateReference();
    demoRequests.set(reference, {
      name,
      service,
      purpose,
      status: "Received",
      submittedAt: new Date()
    });

    showMessage(
      "request-result",
      `Demo request submitted. Your reference number is ${reference}. Save this number to check the status. This is not a real barangay transaction.`
    );

    form.reset();
  });
}

/* ---------- Status checker ---------- */
function setupStatusForm() {
  const form = document.getElementById("status-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.getElementById("reference-input");
    const reference = input.value.trim().toUpperCase();

    if (!reference) {
      showMessage("status-result", "Please enter a reference number.", true);
      return;
    }

    const record = demoRequests.get(reference);

    if (!record) {
      showMessage(
        "status-result",
        `No demo record found for "${reference}". Generate a request first using the form above.`,
        true
      );
      return;
    }

    showMessage(
      "status-result",
      `Reference: ${reference}\nService: ${record.service}\nStatus: ${record.status}\nSubmitted: ${record.submittedAt.toLocaleString()}\n\nThis is demo data only.`
    );
  });
}

/* ---------- Initialise ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  setupRequestForm();
  setupStatusForm();
});
