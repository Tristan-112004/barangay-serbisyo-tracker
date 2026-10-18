# Prompt Documentation Log – Laboratory Activity #4

**Student:** [Your Name]  
**Sector:** Governance  
**Project:** Barangay Serbisyo Tracker  
**Model used:** GitHub Copilot (Chat) in Visual Studio Code  

> **Documentation rule:** The outputs below are **simulated examples** for demonstration. Replace them with the **actual responses** from your own Copilot session before final submission. Do not submit invented outputs as if they were real Copilot responses.

---

## Task 1 – Sector Selection

**Sector:** Governance  
**Local Challenge:** Residents in many Philippine barangays need to visit the barangay hall physically just to ask about service requirements, submit a request, and follow up on its status. This creates inconvenience, long queues, and limited transparency, especially for residents with limited time, mobility, or digital access.  
**Target Users:** Residents of Barangay Mabini (fictional community), including students, workers, senior citizens, and persons with disabilities.  
**Proposed Project:** Barangay Serbisyo Tracker – a single‑page demo portal that lists common services, generates a demo request reference, and allows status checking.  
**Key Features:**  
1. Service directory with requirements.  
2. Demo request form that generates a tracking reference.  
3. Demo status checker for generated references.

---

## Task 2 – Zero‑Shot Prompting

**Objective:** Observe what Copilot generates from a basic prompt without examples.

**Exact Prompt:**
> Create a simple webpage for a barangay governance project.

**Actual Copilot Output (simulated):**  
Saved as `outputs/task2-zero-shot-output.html`. The output was a basic HTML page with a heading “Barangay Governance,” a short paragraph, and an unordered list of generic services (e.g., “Barangay Clearance,” “Certificate of Residency”). It used minimal inline CSS and had **no JavaScript interactivity**, **no target community**, and **no request‑tracking feature**.

**What Worked:** The page rendered quickly and included relevant service names.  
**What Needs Improvement:** The AI assumed a generic informational page. It omitted the specific local context, the target users, and any interactive elements. The prompt needed clearer requirements.  
**Next Action / Verification:** Rewrite the prompt using the anatomy of a prompt (role, task, context, constraints, expected output, acceptance criteria) and compare the new output.

---

## Task 3 – Structured Prompt Improvement (Anatomy of a Prompt)

**Objective:** Improve output relevance using structured prompt components.

**Exact Prompt:**
> Act as a frontend web developer. Create a responsive single‑page Barangay Service Portal for residents of Barangay Mabini (fictional), a local community in the Philippines. Include a service directory with at least five common barangay services (Barangay Clearance, Certificate of Residency, Indigency Certificate, Business Permit, Complaint Filing), a demo service request form that generates a tracking reference number, and a status checker that looks up a demo reference. Use semantic HTML, CSS, and vanilla JavaScript. Do not use external frameworks, backend services, or live government data. All data must be clearly labelled as fictional/demo. Provide the complete HTML, CSS, and JS in separate files. The interface must be readable on mobile screens (320px width) and all interactive elements must be keyboard accessible with visible focus indicators. Acceptance criteria: (1) Service directory displays service name, description, and requirements. (2) Request form captures name, service type, and purpose, then shows a generated reference like “BRGY-2025-0001”. (3) Status checker accepts a reference and shows a demo status. (4) The page passes basic accessibility checks (labels, semantic landmarks, focus styles).

**Actual Copilot Output (simulated):**  
Saved as `outputs/task3-structured-output.html`. Copilot generated a much more relevant page with service cards, a request form, and a status checker. However, the form inputs used `<div>` wrappers instead of a `<form>` element, and some inputs lacked explicit `<label for>` associations.

**What Worked:** The output included the requested features and used semantic sectioning (`<section>`, `<article>`). The service directory matched the specified services.  
**What Needs Improvement:** Accessibility gaps remained (missing form element, incomplete label associations). The status checker did not handle empty or invalid input gracefully.  
**Next Action / Verification:** Use a few‑shot prompt to standardise service items, a role‑assignment prompt to review accessibility, and a structured analysis prompt to fix the most important issues.

**Differences from zero‑shot baseline (at least two):**  
1. Zero‑shot had no interactive request form or status checker; the structured output included both.  
2. Zero‑shot did not mention the target community; the structured output explicitly identified Barangay Mabini.  
3. Zero‑shot used inline CSS; the structured output separated CSS and JS into dedicated files.

---

## Task 4 – Few‑Shot and Role Assignment

### Experiment A – Few‑Shot Prompting

**Objective:** Provide examples of the expected data format to make AI output more consistent.

**Exact Prompt:**
> Create service directory items using this format:  
> `Service: [Name] | Description: [Description] | Requirements: [Requirements]`  
> Example 1: Service: Barangay Clearance | Description: Official document for employment or business. | Requirements: Valid ID, Cedula.  
> Example 2: Service: Certificate of Residency | Description: Proof of residence in the barangay. | Requirements: Valid ID, Proof of billing.  
> Generate three additional common barangay services using the same format.

**Actual Copilot Output (simulated):**  
Saved as `outputs/task4a-few-shot-output.md`. Copilot generated:
- Service: Indigency Certificate | Description: Certification for residents who need financial assistance. | Requirements: Valid ID, Barangay certification.
- Service: Business Permit | Description: Permit for operating a business within the barangay. | Requirements: DTI registration, Lease contract, Valid ID.
- Service: Complaint Filing | Description: File a community complaint for mediation or action. | Requirements: Valid ID, Written complaint.

**What Worked:** The output followed the demonstrated format consistently.  
**What Needs Improvement:** The descriptions were brief; additional context could make them more useful.  
**Next Action / Verification:** Integrate these items into the final service directory and verify they render correctly.

### Experiment B – Role Assignment

**Objective:** Examine the same interface from a specialised perspective.

**Exact Prompt:**
> Act as a frontend accessibility reviewer. Examine the generated Barangay Service Portal. Identify problems involving HTML semantics, keyboard access, labels, and visual clarity. Recommend targeted improvements without changing the project’s scope.

**Actual Copilot Output (simulated):**  
Saved as `outputs/task4b-role-assignment-output.md`. Key recommendations:
1. Wrap the request and status inputs in a `<form>` element to support native submission and reset behaviour.
2. Associate every input with a `<label for="...">` and matching `id`.
3. Define a visible `:focus` style for all interactive controls.
4. Use `aria-live="polite"` on result containers so screen readers announce generated reference numbers and status messages.
5. Ensure the status checker trims input and handles empty values with a clear error message.

**What Worked:** The role assignment produced targeted, actionable recommendations that were easy to implement.  
**What Needs Improvement:** Some recommendations required manual testing (e.g., keyboard traversal) to confirm.  
**Next Action / Verification:** Apply the recommendations in the structured analysis task and test the result.

---

## Task 5 – Structured Analysis and Refinement

**Objective:** Use AI‑assisted analysis to identify and improve a specific implementation weakness.

**Exact Prompt:**
> Review my Barangay Service Portal. Check whether the interactive request form works correctly, whether the HTML uses appropriate semantic elements, and whether the interface is usable on mobile screens. Identify the two most important implementation issues based on the provided code. Recommend the smallest appropriate corrections and explain how I can test them.

**Actual Copilot Output (simulated):**  
Saved as `outputs/task5-structured-analysis-output.md`. Copilot identified:

**Issue 1 – Missing label associations.**  
The request form inputs were not explicitly associated with their labels.  
**Smallest correction:** Add `id` attributes to the inputs and matching `for` attributes to the labels.  
**Verification:** Use a screen reader or the browser’s accessibility inspector to confirm that focusing an input announces the correct label. Clicking the label should also focus the corresponding input.

**Issue 2 – Status checker does not handle empty or unknown references gracefully.**  
If the user submits an empty reference or an unknown reference, the page does not clearly explain what went wrong.  
**Smallest correction:** Add an empty‑value check and a “not found” message with guidance.  
**Verification:** Submit the form with no input, then with a random reference such as `TEST-999`. Confirm that an error message appears in the result box.

**Correction applied and verified:**  
I applied **Issue 1** by rewriting the form with explicit `<label for>` and `id` pairs. I verified in the browser that clicking the “Full name” label focuses the name input, and the accessibility tree shows the correct label for each field. I also applied **Issue 2** by adding the validation logic in `script.js`. Testing with an empty reference and an unknown reference both produced clear, non‑blocking error messages.

---

## Task 6 – Compare and Submit

### Final Comparison Table

| Technique | Observation |
|-----------|-------------|
| **Zero‑Shot** | The AI assumed a generic informational page. It omitted the local community, the target users, and any interactive request‑tracking features. It produced only static content. |
| **Structured Prompt** | Adding role, context, constraints, and acceptance criteria produced a far more relevant portal with a service directory, request form, and status checker. The output still had accessibility gaps. |
| **Few‑Shot** | Providing two examples standardised the service‑item format. Additional items were consistent in structure and easy to integrate. |
| **Role Assignment** | The accessibility‑reviewer perspective identified concrete problems (missing `<form>`, label associations, focus styles) that were not obvious from a general review. |
| **Structured Analysis** | The focused review pinpointed two high‑impact issues and recommended the smallest corrections. After applying the fixes, I verified label behaviour and error handling in the browser. |

### Final Reflection

Structured prompting produced the most useful initial implementation because it defined the required features, technology constraints, and acceptance criteria. Few‑shot prompting made the service directory content consistent, while role assignment surfaced accessibility concerns that I would likely have overlooked. Structured analysis then helped me prioritise and fix the most important issues with verification. I learned that AI‑generated output is a starting point, not a finished product: every recommendation must be inspected and tested before acceptance. The final prototype is still a demo, but it now has clearer semantics, better keyboard access, and more helpful error handling than the zero‑shot baseline.

---

## Preserved Outputs

| File | Description |
|------|-------------|
| `outputs/task2-zero-shot-output.html` | Baseline zero‑shot output |
| `outputs/task3-structured-output.html` | Structured‑prompt output |
| `outputs/task4a-few-shot-output.md` | Few‑shot generated service items |
| `outputs/task4b-role-assignment-output.md` | Accessibility review |
| `outputs/task5-structured-analysis-output.md` | Technical analysis and corrections |

---

## Final Project Files

The final prototype uses `index.html`, `styles.css`, and `script.js` in the project root. It incorporates the corrections from Task 5: semantic form elements, explicit label associations, visible focus styles, `aria-live` result regions, and graceful error handling in the status checker.
