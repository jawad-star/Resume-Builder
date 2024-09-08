// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById("cv-form") as HTMLFormElement;
const validType = {
  TEXT: "text",
  TEXT_EMP: "text_emp",
  EMAIL: "email",
  DIGIT: "digit",
  PHONENO: "phoneno",
  ANY: "any",
} as const;

type ValidType = typeof validType[keyof typeof validType];

// user inputs elements
const firstnameElem = mainForm.querySelector("[name=firstname]") as HTMLInputElement;
const middlenameElem = mainForm.querySelector("[name=middlename]") as HTMLInputElement;
const lastnameElem = mainForm.querySelector("[name=lastname]") as HTMLInputElement;
const imageElem = mainForm.querySelector("[name=image]") as HTMLInputElement;
const designationElem = mainForm.querySelector("[name=designation]") as HTMLInputElement;
const addressElem = mainForm.querySelector("[name=address]") as HTMLInputElement;
const emailElem = mainForm.querySelector("[name=email]") as HTMLInputElement;
const phonenoElem = mainForm.querySelector("[name=phoneno]") as HTMLInputElement;
const summaryElem = mainForm.querySelector("[name=summary]") as HTMLTextAreaElement;

// display elements
const nameDsp = document.getElementById("fullname_dsp") as HTMLSpanElement;
const imageDsp = document.getElementById("image_dsp") as HTMLImageElement;
const phonenoDsp = document.getElementById("phoneno_dsp") as HTMLSpanElement;
const emailDsp = document.getElementById("email_dsp") as HTMLSpanElement;
const addressDsp = document.getElementById("address_dsp") as HTMLSpanElement;
const designationDsp = document.getElementById("designation_dsp") as HTMLSpanElement;
const summaryDsp = document.getElementById("summary_dsp") as HTMLSpanElement;
const projectsDsp = document.getElementById("projects_dsp") as HTMLDivElement;
const achievementsDsp = document.getElementById("achievements_dsp") as HTMLDivElement;
const skillsDsp = document.getElementById("skills_dsp") as HTMLDivElement;
const educationsDsp = document.getElementById("educations_dsp") as HTMLDivElement;
const experiencesDsp = document.getElementById("experiences_dsp") as HTMLDivElement;

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement | HTMLTextAreaElement>[]) => {
  const elemsAttrsCount = nodeLists.length;
  const elemsDataCount = nodeLists[0].length;
  const tempDataArr: Record<string, string>[] = [];

  // first loop deals with the no of repeaters value
  for (let i = 0; i < elemsDataCount; i++) {
    const dataObj: Record<string, string> = {}; // creating an empty object to fill the data
    // second loop fetches the data for each repeaters value or attributes
    for (let j = 0; j < elemsAttrsCount; j++) {
      // setting the key name for the object and fill it with data
      dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
    }
    tempDataArr.push(dataObj);
  }

  return tempDataArr;
};

const getUserInputs = () => {
  // achievements
  const achievementsTitleElem = document.querySelectorAll(".achieve_title") as NodeListOf<HTMLInputElement>;
  const achievementsDescriptionElem = document.querySelectorAll(".achieve_description") as NodeListOf<HTMLTextAreaElement>;

  // experiences
  const expTitleElem = document.querySelectorAll(".exp_title") as NodeListOf<HTMLInputElement>;
  const expOrganizationElem = document.querySelectorAll(".exp_organization") as NodeListOf<HTMLInputElement>;
  const expLocationElem = document.querySelectorAll(".exp_location") as NodeListOf<HTMLInputElement>;
  const expStartDateElem = document.querySelectorAll(".exp_start_date") as NodeListOf<HTMLInputElement>;
  const expEndDateElem = document.querySelectorAll(".exp_end_date") as NodeListOf<HTMLInputElement>;
  const expDescriptionElem = document.querySelectorAll(".exp_description") as NodeListOf<HTMLTextAreaElement>;

  // education
  const eduSchoolElem = document.querySelectorAll(".edu_school") as NodeListOf<HTMLInputElement>;
  const eduDegreeElem = document.querySelectorAll(".edu_degree") as NodeListOf<HTMLInputElement>;
  const eduCityElem = document.querySelectorAll(".edu_city") as NodeListOf<HTMLInputElement>;
  const eduStartDateElem = document.querySelectorAll(".edu_start_date") as NodeListOf<HTMLInputElement>;
  const eduGraduationDateElem = document.querySelectorAll(".edu_graduation_date") as NodeListOf<HTMLInputElement>;
  const eduDescriptionElem = document.querySelectorAll(".edu_description") as NodeListOf<HTMLTextAreaElement>;

  const projTitleElem = document.querySelectorAll(".proj_title") as NodeListOf<HTMLInputElement>;
  const projLinkElem = document.querySelectorAll(".proj_link") as NodeListOf<HTMLInputElement>;
  const projDescriptionElem = document.querySelectorAll(".proj_description") as NodeListOf<HTMLTextAreaElement>;

  const skillElem = document.querySelectorAll(".skill") as NodeListOf<HTMLInputElement>;

  // event listeners for form validation
  firstnameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, validType.TEXT, "First Name")
  );
  middlenameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, validType.TEXT_EMP, "Middle Name")
  );
  lastnameElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, validType.TEXT, "Last Name")
  );
  phonenoElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, validType.PHONENO, "Phone Number")
  );
  emailElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, validType.EMAIL, "Email")
  );
  addressElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, validType.ANY, "Address")
  );
  designationElem.addEventListener("keyup", (e) =>
    validateFormData(e.target as HTMLInputElement, validType.TEXT, "Designation")
  );

  achievementsTitleElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Title")
    )
  );
  achievementsDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLTextAreaElement, validType.ANY, "Description")
    )
  );
  expTitleElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Title")
    )
  );
  expOrganizationElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Organization")
    )
  );
  expLocationElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Location")
    )
  );
  expStartDateElem.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "End Date")
    )
  );
  expEndDateElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "End Date")
    )
  );
  expDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLTextAreaElement, validType.ANY, "Description")
    )
  );
  eduSchoolElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "School")
    )
  );
  eduDegreeElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Degree")
    )
  );
  eduCityElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "City")
    )
  );
  eduStartDateElem.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Start Date")
    )
  );
  eduGraduationDateElem.forEach((item) =>
    item.addEventListener("blur", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Graduation Date")
    )
  );
  eduDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLTextAreaElement, validType.ANY, "Description")
    )
  );
  projTitleElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Title")
    )
  );
  projLinkElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "Link")
    )
  );
  projDescriptionElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLTextAreaElement, validType.ANY, "Description")
    )
  );
  skillElem.forEach((item) =>
    item.addEventListener("keyup", (e) =>
      validateFormData(e.target as HTMLInputElement, validType.ANY, "skill")
    )
  );

  return {
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,
    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(
      ["achieve_title", "achieve_description"],
      achievementsTitleElem,
      achievementsDescriptionElem
    ),
    experiences: fetchValues(
      [
        "exp_title",
        "exp_organization",
        "exp_location",
        "exp_start_date",
        "exp_end_date",
        "exp_description",
      ],
      expTitleElem,
      expOrganizationElem,
      expLocationElem,
      expStartDateElem,
      expEndDateElem,
      expDescriptionElem
    ),
    educations: fetchValues(
      [
        "edu_school",
        "edu_degree",
        "edu_city",
        "edu_start_date",
        "edu_graduation_date",
        "edu_description",
      ],
      eduSchoolElem,
      eduDegreeElem,
      eduCityElem,
      eduStartDateElem,
      eduGraduationDateElem,
      eduDescriptionElem
    ),
    projects: fetchValues(
      ["proj_title", "proj_link", "proj_description"],
      projTitleElem,
      projLinkElem,
      projDescriptionElem
    ),
    skills: fetchValues(["skill"], skillElem),
  };
};

function validateFormData(elem: HTMLInputElement | HTMLTextAreaElement, elemType: ValidType, elemName: string) {
  // checking for text string and non empty string
  if (elemType === validType.TEXT) {
    if (!strRegex.test(elem.value) || elem.value.trim().length === 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only text string
  if (elemType === validType.TEXT_EMP) {
    if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for email
  if (elemType === validType.EMAIL) {
    if (!emailRegex.test(elem.value) || elem.value.trim().length === 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for phone number
  if (elemType === validType.PHONENO) {
    if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)
      addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only empty
  if (elemType === validType.ANY) {
    if (elem.value.trim().length === 0) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }
}

// adding the invalid text
function addErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement, formElemName: string) {
  (formElem.nextElementSibling as HTMLSpanElement).innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text
function removeErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement) {
  (formElem.nextElementSibling as HTMLSpanElement).innerHTML = "";
}

// show the list data
const showListData = (listData: Record<string, string>[], listContainer: HTMLDivElement) => {
  listContainer.innerHTML = "";
  listData.forEach((listItem) => {
    const itemElem = document.createElement("div");
    itemElem.classList.add("preview-item");

    for (const key in listItem) {
      const subItemElem = document.createElement("span");
      subItemElem.classList.add("preview-item-val");
      subItemElem.innerHTML = `${listItem[key]}`;
      itemElem.appendChild(subItemElem);
    }

    listContainer.appendChild(itemElem);
  });
};

const displayCV = (userData: {
  firstname: string;
  middlename: string;
  lastname: string;
  phoneno: string;
  email: string;
  address: string;
  designation: string;
  summary: string;
  achievements: Record<string, string>[];
  experiences: Record<string, string>[];
  educations: Record<string, string>[];
  projects: Record<string, string>[];
  skills: Record<string, string>[];
}) => {
  nameDsp.innerHTML =
    userData.firstname + " " + userData.middlename + " " + userData.lastname;
  phonenoDsp.innerHTML = userData.phoneno;
  emailDsp.innerHTML = userData.email;
  addressDsp.innerHTML = userData.address;
  designationDsp.innerHTML = userData.designation;
  summaryDsp.innerHTML = userData.summary;
  showListData(userData.projects, projectsDsp);
  showListData(userData.achievements, achievementsDsp);
  showListData(userData.skills, skillsDsp);
  showListData(userData.educations, educationsDsp);
  showListData(userData.experiences, experiencesDsp);
};

// generate CV
const generateCV = () => {
  const userData = getUserInputs();
  displayCV(userData);
  console.log(userData);
};

function previewImage() {
  const oFReader = new FileReader();
  if (imageElem.files && imageElem.files[0]) {
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function (ofEvent) {
      if (ofEvent.target && ofEvent.target.result) {
        imageDsp.src = ofEvent.target.result as string;
      }
    };
  }
}

// print CV
function printCV() {
  window.print();
}
