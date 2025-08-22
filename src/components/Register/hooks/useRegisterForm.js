import { useState } from "react";
import { registerUser } from "../../../api/register/registerApi";

export default function useRegisterForm() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");

  const calculateAge = (dateString) => {
    if (!dateString) return "";

    const today = new Date();
    const birthDate = new Date(dateString);

    if (isNaN(birthDate.getTime())) return "";

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge.toString();
  };

  const handleDobChange = (dateString) => {
    setDob(dateString);
    setAge(calculateAge(dateString));
  };

  const formDob = (dateStr) => {
    const [year, month, day] = dateStr.split("_");
    return `${day}-${month}-${year}`;
  };

  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [workingStatus, setWorkingStatus] = useState("");

  const [linkedInProfileUrl, setLinkedInProfileUrl] = useState("");
  const [linkedInName, setLinkedInName] = useState("");
  const [linkedInSummary, setLinkedInSummary] = useState("");

  const [priorities, setPriorities] = useState([]);
  const [priorityInput, setPriorityInput] = useState("");
  const MAX_PRIORITIES = 10;

  const addPriority = () => {
    const v = priorityInput.trim();
    if (!v) return;
    if (priorities.includes(v)) {
      setPriorityInput("");
      return;
    }
    if (priorities.length >= MAX_PRIORITIES) return;
    setPriorities((p) => [...p, v]);
    setPriorityInput("");
  };

  const handlePriorityKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPriority();
    }
  };

  const removePriority = (idx) => {
    setPriorities((p) => p.filter((_, i) => i !== idx));
  };

  // skills state
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const MAX_SKILLS = 10;

  const commonSkills = [
    "ENGINEERING",
    "PRODUCT",
    "DESIGN",
    "MARKETING",
    "SALES",
    "FINANCE",
    "OPERATIONS",
    "LEGAL",
    "HR",
    "STRATEGY",
    "DATA SCIENCE",
    "AI ML",
  ];

  const addSkill = (v) => {
    const value = (v || skillInput).trim();
    if (!value) return;
    if (skills.includes(value)) {
      setSkillInput("");
      return;
    }
    if (skills.length >= MAX_SKILLS) return;
    setSkills((prev) => [...prev, value]);
    setSkillInput("");
  };

  const handleSkillKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (idx) => {
    setSkills((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleCommonSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills((prev) => prev.filter((s) => s !== skill));
    } else {
      addSkill(skill);
    }
  };

  // Industries state
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [industryInput, setIndustryInput] = useState("");
  const MAX_SELECTABLE_INDUSTRIES = 5;

  const toggleIndustry = (id) => {
    setSelectedIndustries((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        if (prev.length >= MAX_SELECTABLE_INDUSTRIES) return prev;
        return [...prev, id];
      }
    });
  };

  const removeIndustry = (id) => {
    setSelectedIndustries((prev) =>
      prev.filter((industryId) => industryId !== id)
    );
  };

  const handleIndustryKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIndustry();
    }
  };

  // Experience state
  const [experiences, setExperiences] = useState([]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        currentlyWorking: false,
      },
    ]);
  };

  const updateExperience = (id, field, value) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  // Education state
  const [educationList, setEducationList] = useState([]);
  const addEducation = () => {
    setEducationList((prev) => [
      ...prev,
      {
        id: Date.now(),
        institution: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const updateEducation = (id, field, value) => {
    setEducationList((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleRegister = async () => {
    try {
      const safeString = (str) =>
        typeof str === "string" ? str.toUpperCase().replace(/ /g, "_") : "";
      const payload = {
        firstName,
        lastName,
        email,
        dob,
        age: age || null,
        goal: goal || null,
        priorities,
        experience: experience || null,
        workingStatus: workingStatus?.id || null,
        skills: skills.map((s) => s.id),
        industries: selectedIndustries,
        linkedInProfileUrl,
        linkedInName,
        linkedInSummary,
        linkedInExperience: (experiences || []).map((exp) => ({
          title: exp.jobTitle,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.currentlyWorking
            ? null
            : exp.endDate
            ? `${exp.endDate}-01`
            : null,
          location: exp.location,
          isCurrent: exp.currentlyWorking,
        })),
        linkedInEducation: (educationList || []).map((edu) => ({
          institutionName: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.field,
          startYear: parseInt(edu.startYear) || null,
          endYear: parseInt(edu.endYear) || null,
        })),
        linkedInSkills: skills.map((s) => s.value),
        linkedInConnectionsCount: 500,
      };

      console.log("Playload being sent:", JSON.stringify(payload, null, 2));
      const data = await registerUser(payload);
      console.log("Registration Success:", data);
      alert("User registered successfully!");
    } catch (err) {
      console.error("Registration Error:", err);
      alert(err.message || "Registration failed");
    }
  };
  // console.log("goal:", goal);
  // console.log("experience:", experience);
  // console.log("workingStatus:", workingStatus);
  // console.log("skills:", skills);
  // console.log("industries:", industries);
  // console.log("Goal state before submit:", goal);

  // console.log("Industries state before submit:", selectedIndustries);

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    dob,
    setDob,
    goal,
    setGoal,
    experience,
    setExperience,
    workingStatus,
    setWorkingStatus,
    priorities,
    setPriorities,
    priorityInput,
    setPriorityInput,
    skills,
    setSkills,
    skillInput,
    setSkillInput,
    commonSkills,
    selectedIndustries,
    setSelectedIndustries,
    toggleIndustry,
    removeIndustry,
    // industries,
    // setIndustries,
    // industryInput,
    // setIndustryInput,
    experiences,
    setExperiences,
    educationList,
    setEducationList,
    linkedInProfileUrl,
    setLinkedInProfileUrl,
    linkedInName,
    setLinkedInName,
    linkedInSummary,
    setLinkedInSummary,

    addPriority,
    handlePriorityKey,
    removePriority,
    addSkill,
    handleSkillKey,
    removeSkill,
    toggleCommonSkill,
    // addIndustry,
    // removeIndustry,
    // handleIndustryKey,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    handleRegister,
    MAX_PRIORITIES,
    MAX_SKILLS,
    MAX_SELECTABLE_INDUSTRIES,
  };
}
