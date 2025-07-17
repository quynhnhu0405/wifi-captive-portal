document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  let selectedLang = "en";
  let chosenLang = "en";
  let chosenGender = "male";

  const translations = {
    en: {
      langTitle: "Language/ Ngôn ngữ",
      genderTitle: "Gender – Please select your gender",
      birthTitle: "Please choose your birth year",
      birthPlaceholder: "*YOUR BIRTH YEAR",
      confirm: " Continue to the Internet",
      finish: " Connect to the Internet",
      male: "MALE",
      female: "FEMALE",
      note: "* Please choose your birth year",
    },
    vi: {
      langTitle: "Language/ Ngôn ngữ",
      genderTitle: "Vui lòng chọn giới tính của bạn",
      birthTitle: "Vui lòng chọn năm sinh của bạn",
      birthPlaceholder: "*NĂM SINH CỦA BẠN",
      confirm: "Tiếp tục để truy cập internet",
      finish: "Kết nối internet",
      male: "NAM",
      female: "NỮ",
      note: "* Vui lòng chọn năm sinh.",
    }
  };

  function showStep(step) {
    document.querySelectorAll(".step").forEach((el) => {
      el.classList.add("hidden");
    });
    document.querySelector(`.step[data-step="${step}"]`).classList.remove("hidden");
    currentStep = step;
  }

  function updateLanguage(lang) {
    selectedLang = lang;
    const t = translations[lang];

    document.getElementById("lang-title").innerText = t.langTitle;
    document.getElementById("gender-title").innerHTML = t.genderTitle;
    document.getElementById("birth-title").innerHTML = t.birthTitle;
    document.getElementById("confirm-lang").innerText = t.confirm;
    document.getElementById("confirm-gender").innerText = t.confirm;
    document.getElementById("confirm-birth").innerText = t.finish;
    document.querySelectorAll(".gender-btn")[0].innerText = t.male;
    document.querySelectorAll(".gender-btn")[1].innerText = t.female;
    document.querySelectorAll(".note")[0].innerText = t.note;

    document.querySelectorAll(".lang-switch .lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.innerText.toLowerCase() === (lang === "vi" ? "vie" : "eng"));
    });

    document.querySelectorAll(".step[data-step='1'] .lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  document.querySelectorAll(".lang-switch .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.innerText.toLowerCase();
      const mappedLang = lang === "vie" ? "vi" : "en";
      chosenLang = mappedLang;
      updateLanguage(mappedLang);
    });
  });

  document.querySelectorAll(".step[data-step='1'] .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      chosenLang = btn.dataset.lang;
      document.querySelectorAll(".step[data-step='1'] .lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateLanguage(chosenLang);
    });
  });

  document.querySelectorAll(".gender-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      chosenGender = btn.dataset.value;
      document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  document.getElementById("confirm-lang").addEventListener("click", () => {
    if (!chosenLang) {
      alert("Please select a language before continuing.");
      return;
    }
    showStep(2);
  });

  document.getElementById("confirm-gender").addEventListener("click", () => {
    if (!chosenGender) {
      alert("Please select a gender before continuing.");
      return;
    }
    showStep(3);
  });

  document.getElementById("confirm-birth").addEventListener("click", () => {
    const birthSelect = document.getElementById("birth-select");
    const birthYear = birthSelect.value;
    const note = document.querySelector(".step[data-step='3'] .note");

    if (!birthYear) {
      note.classList.remove("hidden");
      birthSelect.focus();
      return;
    }

    note.classList.add("hidden");
    const payload = {
      language: chosenLang,
      gender: chosenGender,
      birthYear: parseInt(birthYear),
    };

    wifiService.submitCustomerInfo(payload)
      .then((res) => {
        console.log("Submitted successfully:", res.data);
        window.location.href = "https://u444.vn";
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("Something went wrong. Please try again.");
      });
  });

  updateLanguage(chosenLang);
  showStep(currentStep);

  document.querySelectorAll(".gender-btn").forEach((btn) => {
    if (btn.dataset.value === "male") {
      btn.classList.add("active");
    }
  });

  const birthSelect = document.getElementById('birth-select');
  const currentYear = new Date().getFullYear();
  const minYear = 1900;

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "*YOUR BIRTH YEAR";
  birthSelect.appendChild(defaultOption);

  for (let year = currentYear; year >= minYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    birthSelect.appendChild(option);
  }

  // Initialize Choices.js
  const birthChoices = new Choices(birthSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'auto',
    placeholder: true,
    placeholderValue: "*YOUR BIRTH YEAR",
  });

  document.head.appendChild(style);
});
