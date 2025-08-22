import React, { useState, useRef, useEffect } from "react";
import "./Register.css";
import { CaretDown, Plus, X } from "phosphor-react";

import axiosInstance from "../../api/axiosInstance";
import useRegisterForm from "./hooks/useRegisterForm";
import CustomDropdown from "./CustomDropdown";
import useMetadata from "./hooks/useMetadata";

const Register = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    dob,
    setDob,
    goal,
    age,
    setGoal,
    experience,
    setExperience,
    workingStatus,
    setWorkingStatus,
    priorities,
    priorityInput,
    setPriorityInput,
    addPriority,
    handlePriorityKey,
    removePriority,
    skills,
    setSkills,
    skillInput,
    setSkillInput,
    addSkill,
    handleSkillKey,
    removeSkill,
    toggleCommonSkill,
    commonSkills,
    toggleSkill,
    industries,
    industryInput,
    setIndustryInput,
    addIndustry,
    selectedIndustries,
    setSelectedIndustries,
    toggleIndustry,
    removeIndustry,
    handleIndustryKey,
    experiences,
    addExperience,
    updateExperience,
    removeExperience,
    educationList,
    addEducation,
    updateEducation,
    removeEducation,
    linkedInProfileUrl,
    setLinkedInProfileUrl,
    linkedInName,
    setLinkedInName,
    linkedInSummary,
    setLinkedInSummary,
    handleRegister,
    MAX_PRIORITIES,
    MAX_SKILLS,
    MAX_INDUSTRIES,
    MAX_SELECTABLE_INDUSTRIES = 5,
  } = useRegisterForm();


  const { metadata, loading, error } = useMetadata();

  const [showMoreGroups, setShowMoreGroups] = useState({});

  const toggleShowMore = (subHeader) => {
    setShowMoreGroups((prev) => ({
      ...prev,
      [subHeader]: !prev[subHeader],
    }));
  };


  const [formValues, setFormValues] = useState({});


  return (
    <div className="register-page">
      <div className="register-box">
        <h1 className="register-heading">Complete Your Profile</h1>
        <p className="register-para">
          Help us match you with the right connections
        </p>

        {/* Name */}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* DOB */}

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <div className="form-group" style={{ flex: 1 }}>
            <label>Age</label>
            <input
              type="text"
              value={age}
              readOnly
              placeholder="Auto-calculated"
              className="age-input"
              style={{
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed",
                color: "#666",
              }}
            />
          </div>
        </div>

        {/* Goal & Experience */}

        <div className="form-row">
          <CustomDropdown
            label="What's your goal?"
            options={
              metadata?.goals?.options?.map((opt) => ({
                id: opt.id,
                name: opt.value,
                value: opt.id,
              })) || []
            }
            value={goal}
            onChange={(selected) => {
              if (selected && selected.value) {
                setGoal(selected.value);
              } else {
                setGoal("");
              }
            }}
          />

          <CustomDropdown
            label="Experience Level"
            options={
              metadata?.experience?.options?.map((opt) => ({
                id: opt.id,
                name: opt.value,
              })) || []
            }
            value={experience}
            onChange={(selected) => {
              if (selected && selected.id) {
                setExperience(selected.id);
              } else {
                setExperience("");
              }
            }}
          />
        </div>

        {/* Priorities  */}

        {/* Working Status (instead of Priorities chips) */}
        <div className="form-row">
          <CustomDropdown
            label={
              metadata?.workingStatus?.header ||
              "When do you want to start working on a startup full-time?"
            }
            options={
              metadata?.workingStatus?.options?.map((opt) => ({
                id: opt.id,
                name: opt.value,
              })) || []
            }
            value={workingStatus}
            onChange={(selected) => setWorkingStatus(selected)}
          />
        </div>

        {/* <div className="form-group">
          <label>
            When do you want to start working on a startup full-time?
          </label>

          {/* chips 
          <div className="priorities-list">
            {priorities.map((p, i) => (
              <span key={i} className="priority-chip">
                <span className="priority-text">{p}</span>
                <button
                  type="button"
                  className="chip-remove"
                  aria-label={`Remove ${p}`}
                  onClick={() => removePriority(i)}
                >
                  <X size={12} weight="bold" />
                </button>
              </span>
            ))}
          </div>

          {/* input + add button 
          <div className="priority-input-wrapper">
            <input
              className="priority-input"
              placeholder="Add priority (e.g., Team, Product, Funding)"
              value={priorityInput}
              onChange={(e) => setPriorityInput(e.target.value)}
              onKeyDown={handlePriorityKey}
            />
            <button
              type="button"
              className="add-button"
              onClick={addPriority}
              disabled={
                !priorityInput.trim() || priorities.length >= MAX_PRIORITIES
              }
              title="Add priority"
            >
              <Plus
                className="add-icon"
                size={16}
                style={{
                  width: "16px",
                  height: "16px",
                  minWidth: "16px",
                  minHeight: "16px",
                  transform: "none",
                }}
                weight="bold"
                color="#fff"
              />
              {/* <Plus size={32} color="#ffffff" /> 
            </button>
          </div>
          <div className="priority-hint">
            {priorities.length}/{MAX_PRIORITIES} added
          </div>
        </div> */}

        {/* Skills */}
        <div className="form-group">
          <label>{metadata?.skills?.header || "Skills"}</label>

          {/* chips */}
          <div className="priorities-list">
            {skills.map((s, i) => (
              <span key={s.id} className="priority-chip">
                <span className="priority-text">{s.value}</span>
                <button
                  type="button"
                  className="chip-remove"
                  aria-label={`Remove ${s.value}`}
                  onClick={() =>
                    setSkills((prev) => prev.filter((_, idx) => idx !== i))
                  }
                >
                  <X size={12} weight="bold" />
                </button>
              </span>
            ))}
          </div>

          <p className="common-skills-label">Select from common skills:</p>

          {/* Common skills selection */}
          <div className="common-skills-grid">
            {metadata?.skills?.options?.map((skill) => {
              const isSelected = skills.some((s) => s.id === skill.id);
              return (
                <button
                  key={skill.id}
                  type="button"
                  className={`common-skill-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    if (isSelected) {
                      setSkills((prev) =>
                        prev.filter((s) => s.id !== skill.id)
                      );
                    } else {
                      setSkills((prev) => [...prev, skill]);
                    }
                  }}
                >
                  {skill.value}
                </button>
              );
            })}
          </div>
        </div>

        {/* <div className="form-group">
          <label>Skills</label>

          {/* chips 
          <div className="priorities-list">
            {skills.map((s, i) => (
              <span key={i} className="priority-chip">
                <span className="priority-text">{s}</span>
                <button
                  type="button"
                  className="chip-remove"
                  aria-label={`Remove ${s}`}
                  onClick={() => removeSkill(i)}
                >
                  <X size={12} weight="bold" />
                </button>
              </span>
            ))}
          </div>

          {/* input + add button 
          <div className="priority-input-wrapper">
            <input
              className="priority-input"
              placeholder="Add custom skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKey}
            />
            <button
              type="button"
              className="add-button"
              onClick={() => addSkill()}
              disabled={!skillInput.trim() || skills.length >= MAX_SKILLS}
              title="Add skill"
            >
              <Plus
                size={32}
                style={{
                  width: "16px",
                  height: "16px",
                  minWidth: "16px",
                  minHeight: "16px",
                  transform: "none",
                }}
                weight="bold"
                color="#ffffff"
              />
            </button>
          </div>
          <div className="priority-hint">
            {skills.length}/{MAX_SKILLS} added
          </div>

          <p className="common-skills-label">or select from common skills:</p>

          {/* Common skills selection 
          <div className="common-skills-grid">
            {commonSkills.map((skill, idx) => {
              const isSelected = skills.includes(skill);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`common-skill-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleCommonSkill(skill)}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div> */}

        {/* Industries Section */}

        <div className="industries-section">
          <div className="industries-header">
            <label className="industries-label">
              {metadata?.industries?.header || "Select Industries"}
            </label>
            <p className="industries-counter">
              {selectedIndustries.length}/{MAX_SELECTABLE_INDUSTRIES} selected
            </p>
          </div>

          {metadata?.industries?.groups?.map((group) => {
            const isExpanded = showMoreGroups[group.subHeader] || false;
            const optionsToShow = isExpanded
              ? group.options
              : group.options.slice(0, 5);

            return (
              <div key={group.subHeader} className="industry-group">
                {/* Subheader */}
                <p className="sub-header">{group.subHeader}</p>

                {/* Options */}
                <div className="common-skills-grid">
                  {optionsToShow.map((opt) => {
                    const isSelected = selectedIndustries.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`common-skill-btn ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => toggleIndustry(opt.id)}
                        aria-pressed={isSelected}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                </div>

                {/* Show More / Show Less */}
                {group.options.length > 5 && (
                  <div className="show-more-container">
                    <button
                      type="button"
                      className="show-more-btn"
                      onClick={() => toggleShowMore(group.subHeader)}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* <div className="form-group">
          <label className="industry">Industries</label>

          {/* Industry chips (like priorities) 
          <div className="priorities-list">
            {industries.map((industry, i) => (
              <span key={i} className="priority-chip">
                <span className="priority-text">{industry}</span>
                <button
                  type="button"
                  className="chip-remove"
                  aria-label={`Remove ${industry}`}
                  onClick={() => removeIndustry(i)}
                >
                  <X size={12} weight="bold" />
                </button>
              </span>
            ))}
          </div>

          {/* Input + Add button (same as priorities) 
          <div className="priority-input-wrapper">
            <input
              className="priority-input"
              placeholder="Add industry (e.g., FinTech, HealthTech)"
              value={industryInput}
              onChange={(e) => setIndustryInput(e.target.value)}
              onKeyDown={handleIndustryKey}
            />
            <button
              type="button"
              className="add-button"
              onClick={addIndustry}
              disabled={
                !industryInput.trim() || industries.length >= MAX_INDUSTRIES
              }
              title="Add industry"
            >
              <Plus
                size={32}
                style={{
                  width: "16px",
                  height: "16px",
                  minWidth: "16px",
                  minHeight: "16px",
                  transform: "none",
                }}
                weight="bold"
                color="#ffffff"
              />
            </button>
          </div>

          {/* Counter hint
          <div className="priority-hint">
            {industries.length}/{MAX_INDUSTRIES} added
          </div>
        </div> */}

        {/* Experience Section */}
        <div className="experience-section">
          {/* Section Header */}
          <div className="section-header">
            <h3>Experience</h3>
            <button className="add-experience-button" onClick={addExperience}>
              <Plus size={16} weight="bold" color="#fff" />
              <span>Add Experience</span>
            </button>
          </div>

          {/* Experience Blocks */}
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-block">
              {/* Block Header */}
              <div className="block-header">
                <h4>Experience {experiences.indexOf(exp) + 1}</h4>
                <button
                  className="remove-button"
                  onClick={() => removeExperience(exp.id)}
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Job Title + Company Row */}
              <div className="form-row">
                <div className="form-field-vertical">
                  <label className="field-label">Job Title</label>
                  <input
                    type="text"
                    className="field-input"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      updateExperience(exp.id, "jobTitle", e.target.value)
                    }
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="form-field-vertical">
                  <label className="field-label">Company</label>
                  <input
                    type="text"
                    className="field-input"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                    placeholder="Company Name"
                  />
                </div>
              </div>

              {/* Start Date + End Date Row */}
              <div className="form-row">
                <div className="form-field-vertical">
                  <label className="field-label">Start Date</label>
                  <input
                    type="month"
                    className="field-input month-picker"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                  />
                </div>

                <div className="form-field-vertical">
                  <label className="field-label">End Date</label>
                  <input
                    type="month"
                    className="field-input month-picker"
                    value={exp.currentlyWorking ? "" : exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                    disabled={exp.currentlyWorking}
                  />
                </div>
              </div>

              {/* Location + Checkbox Row */}
              <div className="form-row">
                <div className="form-field-vertical">
                  <label className="field-label">Location</label>
                  <input
                    type="text"
                    className="field-input"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, "location", e.target.value)
                    }
                    placeholder="City, Country"
                  />
                </div>

                <div className="form-field-vertical checkbox-align">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) =>
                        updateExperience(
                          exp.id,
                          "currentlyWorking",
                          e.target.checked
                        )
                      }
                    />
                    <span>Currently working here</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}

        <div className="section-header">
          <h3>Education</h3>
          <button className="add-experience-button" onClick={addEducation}>
            <Plus size={16} weight="bold" color="#fff" />
            <span>Add Education</span>
          </button>
        </div>

        {educationList.map((edu, index) => (
          <div key={edu.id} className="education-block">
            <div className="education-header">
              <h3>Education {index + 1}</h3>
              <button
                className="remove-btn"
                onClick={() => removeEducation(edu.id)}
                aria-label="Remove education"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Institution Name</label>
                <input
                  type="text"
                  placeholder="University Name"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, "institution", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  placeholder="Bachelor’s, Master’s, PhD"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, "degree", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  placeholder="Computer Science"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, "field", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Start Year</label>
                <input
                  type="text"
                  placeholder="2020"
                  value={edu.startYear}
                  onChange={(e) =>
                    updateEducation(edu.id, "startYear", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group end-year">
                <label>End Year</label>
                <input
                  type="text"
                  placeholder="2024"
                  value={edu.endYear}
                  onChange={(e) =>
                    updateEducation(edu.id, "endYear", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {/* LinkedIn Information */}

        <div className="linkedin-section">
          <h3>LinkedIn Information</h3>

          <div className="form-group">
            <label>LinkedIn Profile URL</label>
            <input
              type="url"
              placeholder="https://www.linkedin.com/in/yourname/"
              value={linkedInProfileUrl}
              onChange={(e) => setLinkedInProfileUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn Name</label>
            <input
              type="text"
              value={linkedInName}
              onChange={(e) => setLinkedInName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn Summary</label>
            <textarea
              rows="3"
              value={linkedInSummary}
              onChange={(e) => setLinkedInSummary(e.target.value)}
              style={{ color: "black" }}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}

        <div className="button-container">
          <button className="btn-draft">Save as Draft</button>
          <button className="btn-complete" onClick={handleRegister}>
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
};
// };

export default Register;
