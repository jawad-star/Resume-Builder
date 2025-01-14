// regex for validation
var strRegex = /^[a-zA-Z\s]*$/; // containing only letters
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
var digitRegex = /^\d+$/;
var mainForm = document.getElementById("cv-form");
var validType = {
    TEXT: "text",
    TEXT_EMP: "text_emp",
    EMAIL: "email",
    DIGIT: "digit",
    PHONENO: "phoneno",
    ANY: "any",
};
// user inputs elements
var firstnameElem = mainForm.querySelector("[name=firstname]");
var middlenameElem = mainForm.querySelector("[name=middlename]");
var lastnameElem = mainForm.querySelector("[name=lastname]");
var imageElem = mainForm.querySelector("[name=image]");
var designationElem = mainForm.querySelector("[name=designation]");
var addressElem = mainForm.querySelector("[name=address]");
var emailElem = mainForm.querySelector("[name=email]");
var phonenoElem = mainForm.querySelector("[name=phoneno]");
var summaryElem = mainForm.querySelector("[name=summary]");
// display elements
var nameDsp = document.getElementById("fullname_dsp");
var imageDsp = document.getElementById("image_dsp");
var phonenoDsp = document.getElementById("phoneno_dsp");
var emailDsp = document.getElementById("email_dsp");
var addressDsp = document.getElementById("address_dsp");
var designationDsp = document.getElementById("designation_dsp");
var summaryDsp = document.getElementById("summary_dsp");
var projectsDsp = document.getElementById("projects_dsp");
var achievementsDsp = document.getElementById("achievements_dsp");
var skillsDsp = document.getElementById("skills_dsp");
var educationsDsp = document.getElementById("educations_dsp");
var experiencesDsp = document.getElementById("experiences_dsp");
// first value is for the attributes and second one passes the nodelists
var fetchValues = function (attrs) {
    var nodeLists = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nodeLists[_i - 1] = arguments[_i];
    }
    var elemsAttrsCount = nodeLists.length;
    var elemsDataCount = nodeLists[0].length;
    var tempDataArr = [];
    // first loop deals with the no of repeaters value
    for (var i = 0; i < elemsDataCount; i++) {
        var dataObj = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes
        for (var j = 0; j < elemsAttrsCount; j++) {
            // setting the key name for the object and fill it with data
            dataObj["".concat(attrs[j])] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
};
var getUserInputs = function () {
    // achievements
    var achievementsTitleElem = document.querySelectorAll(".achieve_title");
    var achievementsDescriptionElem = document.querySelectorAll(".achieve_description");
    // experiences
    var expTitleElem = document.querySelectorAll(".exp_title");
    var expOrganizationElem = document.querySelectorAll(".exp_organization");
    var expLocationElem = document.querySelectorAll(".exp_location");
    var expStartDateElem = document.querySelectorAll(".exp_start_date");
    var expEndDateElem = document.querySelectorAll(".exp_end_date");
    var expDescriptionElem = document.querySelectorAll(".exp_description");
    // education
    var eduSchoolElem = document.querySelectorAll(".edu_school");
    var eduDegreeElem = document.querySelectorAll(".edu_degree");
    var eduCityElem = document.querySelectorAll(".edu_city");
    var eduStartDateElem = document.querySelectorAll(".edu_start_date");
    var eduGraduationDateElem = document.querySelectorAll(".edu_graduation_date");
    var eduDescriptionElem = document.querySelectorAll(".edu_description");
    var projTitleElem = document.querySelectorAll(".proj_title");
    var projLinkElem = document.querySelectorAll(".proj_link");
    var projDescriptionElem = document.querySelectorAll(".proj_description");
    var skillElem = document.querySelectorAll(".skill");
    // event listeners for form validation
    firstnameElem.addEventListener("keyup", function (e) {
        return validateFormData(e.target, validType.TEXT, "First Name");
    });
    middlenameElem.addEventListener("keyup", function (e) {
        return validateFormData(e.target, validType.TEXT_EMP, "Middle Name");
    });
    lastnameElem.addEventListener("keyup", function (e) {
        return validateFormData(e.target, validType.TEXT, "Last Name");
    });
    phonenoElem.addEventListener("keyup", function (e) {
        return validateFormData(e.target, validType.PHONENO, "Phone Number");
    });
    emailElem.addEventListener("keyup", function (e) {
        return validateFormData(e.target, validType.EMAIL, "Email");
    });
    addressElem.addEventListener("keyup", function (e) {
        return validateFormData(e.target, validType.ANY, "Address");
    });
    designationElem.addEventListener("keyup", function (e) {
        return validateFormData(e.target, validType.TEXT, "Designation");
    });
    achievementsTitleElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Title");
        });
    });
    achievementsDescriptionElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Description");
        });
    });
    expTitleElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Title");
        });
    });
    expOrganizationElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Organization");
        });
    });
    expLocationElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Location");
        });
    });
    expStartDateElem.forEach(function (item) {
        return item.addEventListener("blur", function (e) {
            return validateFormData(e.target, validType.ANY, "End Date");
        });
    });
    expEndDateElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "End Date");
        });
    });
    expDescriptionElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Description");
        });
    });
    eduSchoolElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "School");
        });
    });
    eduDegreeElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Degree");
        });
    });
    eduCityElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "City");
        });
    });
    eduStartDateElem.forEach(function (item) {
        return item.addEventListener("blur", function (e) {
            return validateFormData(e.target, validType.ANY, "Start Date");
        });
    });
    eduGraduationDateElem.forEach(function (item) {
        return item.addEventListener("blur", function (e) {
            return validateFormData(e.target, validType.ANY, "Graduation Date");
        });
    });
    eduDescriptionElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Description");
        });
    });
    projTitleElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Title");
        });
    });
    projLinkElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Link");
        });
    });
    projDescriptionElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "Description");
        });
    });
    skillElem.forEach(function (item) {
        return item.addEventListener("keyup", function (e) {
            return validateFormData(e.target, validType.ANY, "skill");
        });
    });
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(["achieve_title", "achieve_description"], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues([
            "exp_title",
            "exp_organization",
            "exp_location",
            "exp_start_date",
            "exp_end_date",
            "exp_description",
        ], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues([
            "edu_school",
            "edu_degree",
            "edu_city",
            "edu_start_date",
            "edu_graduation_date",
            "edu_description",
        ], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(["proj_title", "proj_link", "proj_description"], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(["skill"], skillElem),
    };
};
function validateFormData(elem, elemType, elemName) {
    // checking for text string and non empty string
    if (elemType === validType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    // checking for only text string
    if (elemType === validType.TEXT_EMP) {
        if (!strRegex.test(elem.value))
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    // checking for email
    if (elemType === validType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    // checking for phone number
    if (elemType === validType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    // checking for only empty
    if (elemType === validType.ANY) {
        if (elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
}
// adding the invalid text
function addErrMsg(formElem, formElemName) {
    formElem.nextElementSibling.innerHTML = "".concat(formElemName, " is invalid");
}
// removing the invalid text
function removeErrMsg(formElem) {
    formElem.nextElementSibling.innerHTML = "";
}
// show the list data
var showListData = function (listData, listContainer) {
    listContainer.innerHTML = "";
    listData.forEach(function (listItem) {
        var itemElem = document.createElement("div");
        itemElem.classList.add("preview-item");
        for (var key in listItem) {
            var subItemElem = document.createElement("span");
            subItemElem.classList.add("preview-item-val");
            subItemElem.innerHTML = "".concat(listItem[key]);
            itemElem.appendChild(subItemElem);
        }
        listContainer.appendChild(itemElem);
    });
};
var displayCV = function (userData) {
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
var generateCV = function () {
    var userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};
function previewImage() {
    var oFReader = new FileReader();
    if (imageElem.files && imageElem.files[0]) {
        oFReader.readAsDataURL(imageElem.files[0]);
        oFReader.onload = function (ofEvent) {
            if (ofEvent.target && ofEvent.target.result) {
                imageDsp.src = ofEvent.target.result;
            }
        };
    }
}
// print CV
function printCV() {
    window.print();
}
