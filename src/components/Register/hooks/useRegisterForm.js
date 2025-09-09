import { useState, useEffect } from "react";
import { registerUser, viewProfile, editProfile } from "../../../api/register/registerApi";
import { hasValidProfileId, saveProfileId, getProfileId } from "../../../utils/profileUtils";

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

  // Image upload state
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");

  // Profile fetch state
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  // Registration state
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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

  // Image upload functions
  const validateImage = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    
    if (!file) {
      setImageError("Please select an image file");
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      setImageError("Please select a valid image file (JPEG, PNG, or GIF)");
      return false;
    }
    
    if (file.size > maxSize) {
      setImageError("Image size must be less than 5MB");
      return false;
    }
    
    setImageError("");
    return true;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      setProfileImage(null);
      setImagePreview(null);
      setImageError("");
      return;
    }
    
    if (validateImage(file)) {
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    setImageError("");
    // Reset the file input
    const fileInput = document.getElementById('profile-image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Fetch and populate profile data
  const fetchProfileData = async () => {
    if (isProfileLoaded) return; // Prevent multiple fetches
    
    setIsLoadingProfile(true);
    setProfileError("");
    
    try {
      const response = await viewProfile();
      
      if (response.success && response.data) {
        const profileData = response.data;
        
        // Populate basic information
        if (profileData.firstName) setFirstName(profileData.firstName);
        if (profileData.lastName) setLastName(profileData.lastName);
        if (profileData.email) setEmail(profileData.email);
        if (profileData.dob) {
          setDob(profileData.dob);
          setAge(calculateAge(profileData.dob));
        }
        if (profileData.goal) setGoal(profileData.goal);
        if (profileData.experience) setExperience(profileData.experience);
        
        // Handle working status - this might need to be mapped from a different field
        // For now, we'll set it if it exists in the response
        if (profileData.workingStatus) {
          setWorkingStatus(profileData.workingStatus);
        }
        
        // Populate priorities
        if (profileData.priorities && Array.isArray(profileData.priorities)) {
          setPriorities(profileData.priorities);
        }
        
        // Populate skills - handle both old and new format
        if (profileData.skills && Array.isArray(profileData.skills)) {
          const skillsData = profileData.skills.map(skill => 
            typeof skill === 'string' 
              ? { id: skill, value: skill } 
              : skill
          );
          setSkills(skillsData);
        }
        
        // Populate industries
        if (profileData.industries && Array.isArray(profileData.industries)) {
          setSelectedIndustries(profileData.industries);
        }
        
        // Populate LinkedIn information
        if (profileData.linkedIn) {
          if (profileData.linkedIn.profileUrl) setLinkedInProfileUrl(profileData.linkedIn.profileUrl);
          if (profileData.linkedIn.name) setLinkedInName(profileData.linkedIn.name);
          if (profileData.linkedIn.summary) setLinkedInSummary(profileData.linkedIn.summary);
          
          // Populate LinkedIn experience
          if (profileData.linkedIn.experience && Array.isArray(profileData.linkedIn.experience)) {
            const experiencesData = profileData.linkedIn.experience.map(exp => ({
              id: Date.now() + Math.random(), // Generate unique ID
              jobTitle: exp.title || "",
              company: exp.company || "",
              startDate: exp.startDate ? exp.startDate.substring(0, 7) : "", // Convert to YYYY-MM format
              endDate: exp.endDate ? exp.endDate.substring(0, 7) : "",
              location: exp.location || "",
              currentlyWorking: exp.isCurrent || false
            }));
            setExperiences(experiencesData);
          }
          
          // Populate LinkedIn education
          if (profileData.linkedIn.education && Array.isArray(profileData.linkedIn.education)) {
            const educationData = profileData.linkedIn.education.map(edu => ({
              id: Date.now() + Math.random(), // Generate unique ID
              institution: edu.institutionName || "",
              degree: edu.degree || "",
              field: edu.fieldOfStudy || "",
              startYear: edu.startYear ? edu.startYear.toString() : "",
              endYear: edu.endYear ? edu.endYear.toString() : ""
            }));
            setEducationList(educationData);
          }
        }
        
        setIsProfileLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfileError(error.message || "Failed to load profile data");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Fetch profile data on component mount only if profileId exists
  useEffect(() => {
    // Check if user is editing existing profile
    const profileId = getProfileId();
    const isEditMode = hasValidProfileId();
    
    setIsEditingProfile(isEditMode);
    
    // Only fetch profile data if profileId exists and is valid
    if (isEditMode) {
      fetchProfileData();
    } else {
      // If no profileId, mark as loaded to show the form without data
      setIsProfileLoaded(true);
    }
  }, []);

  const handleRegister = async () => {
    setIsRegistering(true);
    setRegistrationError("");
    
    try {
      const safeString = (str) =>
        typeof str === "string" ? str.toUpperCase().replace(/ /g, "_") : "";
      const payload = {
        firstName,
        lastName,
        email,
        dob,
        age: age || null,
        profileImage: profileImage || null,
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

      console.log("Payload being sent:", JSON.stringify(payload, null, 2));
      const response = await registerUser(payload);
      
      if (response.success) {
        console.log("Registration Success:", response);
        
        // Save profileId from API response using common utility
        if (response.data && response.data.userId) {
          saveProfileId(response.data.userId);
          console.log("ProfileId saved:", response.data.userId);
        }
        
        alert("User registered successfully!");
        
        // Optionally redirect or update UI state
        // You can add navigation logic here if needed
        
      } else {
        throw new Error(response.message || "Registration failed");
      }
      
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMessage = err.message || err.response?.data?.message || "Registration failed";
      setRegistrationError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleEditProfile = async () => {
    setIsRegistering(true);
    setRegistrationError("");
    
    try {
      const payload = {
        firstName,
        lastName,
        email,
        dob,
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

      console.log("Edit Profile Payload:", JSON.stringify(payload, null, 2));
      const response = await editProfile(payload);
      
      if (response.success) {
        console.log("Profile Update Success:", response);
        alert("Profile updated successfully!");
        
        // Optionally refresh the profile data
        await fetchProfileData();
        
      } else {
        throw new Error(response.message || "Profile update failed");
      }
      
    } catch (err) {
      console.error("Profile Update Error:", err);
      const errorMessage = err.message || err.response?.data?.message || "Profile update failed";
      setRegistrationError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsRegistering(false);
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
    profileImage,
    setProfileImage,
    imagePreview,
    setImagePreview,
    imageError,
    setImageError,

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
    handleImageUpload,
    removeImage,
    validateImage,
    isLoadingProfile,
    profileError,
    isProfileLoaded,
    fetchProfileData,
    isRegistering,
    registrationError,
    setRegistrationError,
    isEditingProfile,
    handleRegister,
    handleEditProfile,
    MAX_PRIORITIES,
    MAX_SKILLS,
    MAX_SELECTABLE_INDUSTRIES,
  };
}
