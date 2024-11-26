import React, { useState } from "react";

export default function Skillsdetails({ formData, updateFormData }) {
  const [skills, setSkills] = useState(formData.skills || [""]);

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    updateFormData({ skills: newSkills });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
    updateFormData({ skills: newSkills });
  };

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Skills Details
          </h1>
          <form>
            {skills.map((skill, index) => (
              <div className="flex space-x-6 mb-4" key={index}>
                <input
                  type="text"
                  placeholder="Add Skill"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Skill
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
