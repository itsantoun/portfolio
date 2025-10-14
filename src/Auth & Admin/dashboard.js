import React, { useState, useEffect } from 'react';
import { auth, database } from './firebase';
import { signOut } from 'firebase/auth';
import { ref, onValue, set, push, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showWorkExpForm, setShowWorkExpForm] = useState(false);
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingWorkExp, setEditingWorkExp] = useState(null);
  const [editingSkillGroup, setEditingSkillGroup] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');

  // Project form data
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    date: '',
    responsibilities: '',
    tools: '',
    url: '',
    icon: null
  });

  // Work experience form data
  const [workExpFormData, setWorkExpFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    responsibilities: '',
    technologies: ''
  });

  // Skills form data
  const [skillsFormData, setSkillsFormData] = useState({
    title: '',
    skills: [{ skill: '', icon: null }]
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [skillIconsPreview, setSkillIconsPreview] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadProjects();
        loadWorkExperiences();
        loadSkills();
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const loadProjects = () => {
    const projectsRef = ref(database, 'projects');
    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const projectsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProjects(projectsArray);
      } else {
        setProjects([]);
      }
    });
  };

  const loadWorkExperiences = () => {
    const workExpRef = ref(database, 'workExperience');
    onValue(workExpRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const workExpArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setWorkExperiences(workExpArray);
      } else {
        setWorkExperiences([]);
      }
    });
  };

  const loadSkills = () => {
    const skillsRef = ref(database, 'skills');
    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const skillsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setSkills(skillsArray);
      } else {
        setSkills([]);
      }
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Project handlers
  const handleProjectInputChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkExpInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkExpFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Skills handlers
  const handleSkillsInputChange = (e) => {
    const { name, value } = e.target;
    setSkillsFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillItemChange = (index, field, value) => {
    const updatedSkills = [...skillsFormData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setSkillsFormData(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleSkillIconChange = (index, file) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Please select an image smaller than 2MB');
        return;
      }

      const updatedSkills = [...skillsFormData.skills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        icon: file
      };
      setSkillsFormData(prev => ({
        ...prev,
        skills: updatedSkills
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setSkillIconsPreview(prev => ({
          ...prev,
          [index]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkillItem = () => {
    setSkillsFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { skill: '', icon: null }]
    }));
  };

  const removeSkillItem = (index) => {
    if (skillsFormData.skills.length > 1) {
      const updatedSkills = skillsFormData.skills.filter((_, i) => i !== index);
      setSkillsFormData(prev => ({
        ...prev,
        skills: updatedSkills
      }));
      
      // Remove preview
      setSkillIconsPreview(prev => {
        const newPreview = { ...prev };
        delete newPreview[index];
        return newPreview;
      });
    }
  };

  const removeSkillIcon = (index) => {
    const updatedSkills = [...skillsFormData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      icon: null
    };
    setSkillsFormData(prev => ({
      ...prev,
      skills: updatedSkills
    }));

    setSkillIconsPreview(prev => {
      const newPreview = { ...prev };
      delete newPreview[index];
      return newPreview;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Please select an image smaller than 2MB');
        return;
      }

      setProjectFormData(prev => ({
        ...prev,
        icon: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    
    try {
      let iconUrl = null;
      
     if (projectFormData.icon instanceof File) {
  iconUrl = await convertImageToBase64(projectFormData.icon);
} else if (projectFormData.icon) {
  iconUrl = projectFormData.icon;
}

      const projectData = {
        title: projectFormData.title,
        date: projectFormData.date,
        responsibilities: projectFormData.responsibilities.split('\n').filter(item => item.trim()),
        tools: [projectFormData.tools],
        url: projectFormData.url,
        icon: iconUrl || '/default-project-icon.png'
      };

      if (editingProject) {
        const projectRef = ref(database, `projects/${editingProject.id}`);
        await set(projectRef, projectData);
        alert('Project updated successfully!');
      } else {
        const projectsRef = ref(database, 'projects');
        await push(projectsRef, projectData);
        alert('Project added successfully!');
      }

      resetProjectForm();
      
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleSubmitWorkExperience = async (e) => {
    e.preventDefault();
    
    try {
      const workExpData = {
        company: workExpFormData.company,
        position: workExpFormData.position,
        startDate: workExpFormData.startDate,
        endDate: workExpFormData.current ? 'Present' : workExpFormData.endDate,
        current: workExpFormData.current,
        responsibilities: workExpFormData.responsibilities.split('\n').filter(item => item.trim()),
        technologies: workExpFormData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
      };

      if (editingWorkExp) {
        const workExpRef = ref(database, `workExperience/${editingWorkExp.id}`);
        await set(workExpRef, workExpData);
        alert('Work experience updated successfully!');
      } else {
        const workExpRef = ref(database, 'workExperience');
        await push(workExpRef, workExpData);
        alert('Work experience added successfully!');
      }

      resetWorkExpForm();
      
    } catch (error) {
      console.error('Error saving work experience:', error);
      alert('Error saving work experience. Please try again.');
    }
  };

  const handleSubmitSkills = async (e) => {
    e.preventDefault();
    
    try {
      // Convert skill icons to base64
      const skillsWithIcons = await Promise.all(
        skillsFormData.skills
          .filter(item => item.skill.trim() !== '')
          .map(async (skillItem) => {
            if (skillItem.icon instanceof File) {
              const base64Icon = await convertImageToBase64(skillItem.icon);
              return {
                skill: skillItem.skill,
                icon: base64Icon
              };
            }
            return skillItem;
          })
      );

      const skillsData = {
        title: skillsFormData.title,
        skills: skillsWithIcons
      };

      if (editingSkillGroup) {
        const skillRef = ref(database, `skills/${editingSkillGroup.id}`);
        await set(skillRef, skillsData);
        alert('Skill group updated successfully!');
      } else {
        const skillsRef = ref(database, 'skills');
        await push(skillsRef, skillsData);
        alert('Skill group added successfully!');
      }

      resetSkillsForm();
      
    } catch (error) {
      console.error('Error saving skills:', error);
      alert('Error saving skills. Please try again.');
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      date: project.date,
      responsibilities: project.responsibilities?.join('\n') || '',
      tools: project.tools?.[0] || '',
      url: project.url || '',
      icon: project.icon || null
    });
    
    if (project.icon && project.icon.startsWith('data:image')) {
      setImagePreview(project.icon);
    } else {
      setImagePreview(null);
    }
    
    setShowProjectForm(true);
  };

  const handleEditWorkExperience = (workExp) => {
    setEditingWorkExp(workExp);
    setWorkExpFormData({
      company: workExp.company || '',
      position: workExp.position || '',
      startDate: workExp.startDate || '',
      endDate: workExp.endDate === 'Present' ? '' : workExp.endDate || '',
      current: workExp.endDate === 'Present',
      responsibilities: workExp.responsibilities?.join('\n') || '',
      technologies: workExp.technologies?.join(', ') || ''
    });
    setShowWorkExpForm(true);
  };

  const handleEditSkillGroup = (skillGroup) => {
    setEditingSkillGroup(skillGroup);
    setSkillsFormData({
      title: skillGroup.title || '',
      skills: skillGroup.skills?.length > 0 ? skillGroup.skills : [{ skill: '', icon: null }]
    });
    
    // Set previews for existing icons
    const previews = {};
    skillGroup.skills?.forEach((skill, index) => {
      if (skill.icon) {
        previews[index] = skill.icon;
      }
    });
    setSkillIconsPreview(previews);
    
    setShowSkillsForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const projectRef = ref(database, `projects/${projectId}`);
        await remove(projectRef);
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const handleDeleteWorkExperience = async (workExpId) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
      try {
        const workExpRef = ref(database, `workExperience/${workExpId}`);
        await remove(workExpRef);
        alert('Work experience deleted successfully!');
      } catch (error) {
        console.error('Error deleting work experience:', error);
        alert('Error deleting work experience. Please try again.');
      }
    }
  };

  const handleDeleteSkillGroup = async (skillGroupId) => {
    if (window.confirm('Are you sure you want to delete this skill group?')) {
      try {
        const skillRef = ref(database, `skills/${skillGroupId}`);
        await remove(skillRef);
        alert('Skill group deleted successfully!');
      } catch (error) {
        console.error('Error deleting skill group:', error);
        alert('Error deleting skill group. Please try again.');
      }
    }
  };

  const resetProjectForm = () => {
    setProjectFormData({
      title: '',
      date: '',
      responsibilities: '',
      tools: '',
      url: '',
      icon: null
    });
    setImagePreview(null);
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const resetWorkExpForm = () => {
    setWorkExpFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: '',
      technologies: ''
    });
    setEditingWorkExp(null);
    setShowWorkExpForm(false);
  };

  const resetSkillsForm = () => {
    setSkillsFormData({
      title: '',
      skills: [{ skill: '', icon: null }]
    });
    setSkillIconsPreview({});
    setEditingSkillGroup(null);
    setShowSkillsForm(false);
  };

  const removeImage = () => {
    setProjectFormData(prev => ({
      ...prev,
      icon: null
    }));
    setImagePreview(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Render methods
  const renderTabs = () => (
    <div className="dashboard-tabs">
      <button 
        className={`dashboard-tab ${activeTab === 'projects' ? 'dashboard-tab-active' : ''}`}
        onClick={() => setActiveTab('projects')}
      >
        Projects ({projects.length})
      </button>
      <button 
        className={`dashboard-tab ${activeTab === 'workExperience' ? 'dashboard-tab-active' : ''}`}
        onClick={() => setActiveTab('workExperience')}
      >
        Work Experience ({workExperiences.length})
      </button>
      <button 
        className={`dashboard-tab ${activeTab === 'skills' ? 'dashboard-tab-active' : ''}`}
        onClick={() => setActiveTab('skills')}
      >
        Skills ({skills.length})
      </button>
    </div>
  );

  const renderProjectsSection = () => (
    <div className="dashboard-projects-section">
      <div className="dashboard-section-header">
        <h3 className="dashboard-section-title">Manage Projects ({projects.length})</h3>
        <button 
          className="dashboard-add-button"
          onClick={() => setShowProjectForm(true)}
        >
          + Add Project
        </button>
      </div>
      
      {projects.length === 0 ? (
        <div className="dashboard-empty-state">
          <p>No projects yet. Add your first project to showcase your work!</p>
          <button 
            className="dashboard-add-button"
            onClick={() => setShowProjectForm(true)}
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="dashboard-projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="dashboard-project-card">
              <div className="dashboard-project-header">
                <div className="dashboard-project-title-section">
                  <div className="dashboard-project-header-with-image">
                    {project.icon && (
                      <img 
                        src={project.icon} 
                        alt={project.title}
                        className="dashboard-project-thumbnail"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        loading="lazy"
                      />
                    )}
                    <div>
                      <h4 className="dashboard-project-title">{project.title}</h4>
                      <span className="dashboard-project-date">{project.date}</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-project-actions">
                  <button 
                    className="dashboard-edit-button"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </button>
                  <button 
                    className="dashboard-delete-button"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="dashboard-project-details">
                <div className="dashboard-detail-row">
                  <strong>Tools:</strong> 
                  <span>{project.tools?.[0] || 'Not specified'}</span>
                </div>
                <div className="dashboard-detail-row">
                  <strong>URL:</strong> 
                  <span className="dashboard-url-text">
                    {project.url ? (
                      <a 
                        href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="dashboard-url-link"
                      >
                        {project.url}
                      </a>
                    ) : (
                      'No URL'
                    )}
                  </span>
                </div>
                <div className="dashboard-detail-row">
                  <strong>Responsibilities:</strong> 
                  <span className="dashboard-responsibilities">
                    {project.responsibilities?.length || 0} items
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWorkExperienceSection = () => (
    <div className="dashboard-projects-section">
      <div className="dashboard-section-header">
        <h3 className="dashboard-section-title">Manage Work Experience ({workExperiences.length})</h3>
        <button 
          className="dashboard-add-button"
          onClick={() => setShowWorkExpForm(true)}
        >
          + Add Work Experience
        </button>
      </div>
      
      {workExperiences.length === 0 ? (
        <div className="dashboard-empty-state">
          <p>No work experience yet. Add your first work experience!</p>
          <button 
            className="dashboard-add-button"
            onClick={() => setShowWorkExpForm(true)}
          >
            Add Work Experience
          </button>
        </div>
      ) : (
        <div className="dashboard-projects-grid">
          {workExperiences.map((workExp) => (
            <div key={workExp.id} className="dashboard-project-card">
              <div className="dashboard-project-header">
                <div className="dashboard-project-title-section">
                  <div>
                    <h4 className="dashboard-project-title">{workExp.position}</h4>
                    <span className="dashboard-project-date">{workExp.company}</span>
                    <div className="dashboard-workexp-dates">
                      {workExp.startDate} - {workExp.endDate}
                      {workExp.current && <span className="dashboard-current-badge">Current</span>}
                    </div>
                  </div>
                </div>
                <div className="dashboard-project-actions">
                  <button 
                    className="dashboard-edit-button"
                    onClick={() => handleEditWorkExperience(workExp)}
                  >
                    Edit
                  </button>
                  <button 
                    className="dashboard-delete-button"
                    onClick={() => handleDeleteWorkExperience(workExp.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="dashboard-project-details">
                <div className="dashboard-detail-row">
                  <strong>Responsibilities:</strong> 
                  <span className="dashboard-responsibilities">
                    {workExp.responsibilities?.length || 0} items
                  </span>
                </div>
                {workExp.technologies && workExp.technologies.length > 0 && (
                  <div className="dashboard-detail-row">
                    <strong>Technologies:</strong> 
                    <span>{workExp.technologies.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSkillsSection = () => (
    <div className="dashboard-projects-section">
      <div className="dashboard-section-header">
        <h3 className="dashboard-section-title">Manage Skills ({skills.length})</h3>
        <button 
          className="dashboard-add-button"
          onClick={() => setShowSkillsForm(true)}
        >
          + Add Skill Group
        </button>
      </div>
      
      {skills.length === 0 ? (
        <div className="dashboard-empty-state">
          <p>No skill groups yet. Add your first skill group!</p>
          <button 
            className="dashboard-add-button"
            onClick={() => setShowSkillsForm(true)}
          >
            Create Your First Skill Group
          </button>
        </div>
      ) : (
        <div className="dashboard-projects-grid">
          {skills.map((skillGroup) => (
            <div key={skillGroup.id} className="dashboard-project-card">
              <div className="dashboard-project-header">
                <div className="dashboard-project-title-section">
                  <div>
                    <h4 className="dashboard-project-title">{skillGroup.title}</h4>
                    <span className="dashboard-project-date">
                      {skillGroup.skills?.length || 0} skills
                    </span>
                  </div>
                </div>
                <div className="dashboard-project-actions">
                  <button 
                    className="dashboard-edit-button"
                    onClick={() => handleEditSkillGroup(skillGroup)}
                  >
                    Edit
                  </button>
                  <button 
                    className="dashboard-delete-button"
                    onClick={() => handleDeleteSkillGroup(skillGroup.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="dashboard-project-details">
                <div className="dashboard-skills-list">
                  {skillGroup.skills?.slice(0, 6).map((skill, index) => (
                    <div key={index} className="dashboard-skill-tag-with-icon">
                      {skill.icon && (
                        <img 
                          src={skill.icon} 
                          alt={skill.skill}
                          className="dashboard-skill-icon"
                        />
                      )}
                      <span>{skill.skill}</span>
                    </div>
                  ))}
                  {skillGroup.skills?.length > 6 && (
                    <span className="dashboard-skill-tag-more">
                      +{skillGroup.skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderProjectForm = () => (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal-content">
        <div className="dashboard-modal-header">
          <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
          <button onClick={resetProjectForm} className="dashboard-close-button">×</button>
        </div>
        
        <form onSubmit={handleSubmitProject} className="dashboard-form">
          <div className="dashboard-form-group">
            <label className="dashboard-label">Project Title *</label>
            <input
              type="text"
              name="title"
              value={projectFormData.title}
              onChange={handleProjectInputChange}
              placeholder="Enter project title"
              required
              className="dashboard-input"
            />
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Date *</label>
            <input
              type="text"
              name="date"
              value={projectFormData.date}
              onChange={handleProjectInputChange}
              placeholder="e.g., January 2024"
              required
              className="dashboard-input"
            />
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Project Image</label>
            <div className="dashboard-image-upload-section">
              {imagePreview ? (
                <div className="dashboard-image-preview-container">
                  <img 
                    src={imagePreview} 
                    alt="Project preview" 
                    className="dashboard-image-preview"
                  />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="dashboard-remove-image-button"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="dashboard-file-input-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="dashboard-file-input"
                    id="project-image"
                  />
                  <label htmlFor="project-image" className="dashboard-file-input-label">
                    <div className="dashboard-upload-area">
                      <span className="dashboard-upload-icon">📁</span>
                      <span>Choose Project Image</span>
                      <small className="dashboard-upload-hint">JPEG, PNG, GIF (Max 2MB)</small>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Responsibilities *</label>
            <textarea
              name="responsibilities"
              value={projectFormData.responsibilities}
              onChange={handleProjectInputChange}
              placeholder="Enter each responsibility on a new line"
              rows="4"
              required
              className="dashboard-textarea"
            />
            <small className="dashboard-help-text">One responsibility per line</small>
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Tools & Technologies *</label>
            <input
              type="text"
              name="tools"
              value={projectFormData.tools}
              onChange={handleProjectInputChange}
              placeholder="e.g., React, Node.js, MongoDB"
              required
              className="dashboard-input"
            />
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Project URL</label>
            <input
              type="url"
              name="url"
              value={projectFormData.url}
              onChange={handleProjectInputChange}
              placeholder="https://example.com"
              className="dashboard-input"
            />
          </div>
          
          <div className="dashboard-form-actions">
            <button type="button" onClick={resetProjectForm} className="dashboard-cancel-button">
              Cancel
            </button>
            <button type="submit" className="dashboard-submit-button">
              {editingProject ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderWorkExpForm = () => (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal-content">
        <div className="dashboard-modal-header">
          <h3>{editingWorkExp ? 'Edit Work Experience' : 'Add Work Experience'}</h3>
          <button onClick={resetWorkExpForm} className="dashboard-close-button">×</button>
        </div>
        
        <form onSubmit={handleSubmitWorkExperience} className="dashboard-form">
          <div className="dashboard-form-group">
            <label className="dashboard-label">Company *</label>
            <input
              type="text"
              name="company"
              value={workExpFormData.company}
              onChange={handleWorkExpInputChange}
              placeholder="Enter company name"
              required
              className="dashboard-input"
            />
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Position *</label>
            <input
              type="text"
              name="position"
              value={workExpFormData.position}
              onChange={handleWorkExpInputChange}
              placeholder="e.g., Senior Developer"
              required
              className="dashboard-input"
            />
          </div>
          
          <div className="dashboard-form-row">
            <div className="dashboard-form-group">
              <label className="dashboard-label">Start Date *</label>
              <input
                type="text"
                name="startDate"
                value={workExpFormData.startDate}
                onChange={handleWorkExpInputChange}
                placeholder="e.g., January 2020"
                required
                className="dashboard-input"
              />
            </div>
            
            <div className="dashboard-form-group">
              <label className="dashboard-label">End Date</label>
              <input
                type="text"
                name="endDate"
                value={workExpFormData.endDate}
                onChange={handleWorkExpInputChange}
                placeholder="e.g., December 2023"
                disabled={workExpFormData.current}
                className="dashboard-input"
              />
            </div>
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-checkbox-label">
              <input
                type="checkbox"
                name="current"
                checked={workExpFormData.current}
                onChange={handleWorkExpInputChange}
                className="dashboard-checkbox"
              />
              I currently work here
            </label>
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Responsibilities *</label>
            <textarea
              name="responsibilities"
              value={workExpFormData.responsibilities}
              onChange={handleWorkExpInputChange}
              placeholder="Enter each responsibility on a new line"
              rows="4"
              required
              className="dashboard-textarea"
            />
            <small className="dashboard-help-text">One responsibility per line</small>
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Technologies</label>
            <input
              type="text"
              name="technologies"
              value={workExpFormData.technologies}
              onChange={handleWorkExpInputChange}
              placeholder="e.g., React, Node.js, Python, AWS"
              className="dashboard-input"
            />
            <small className="dashboard-help-text">Separate technologies with commas</small>
          </div>
          
          <div className="dashboard-form-actions">
            <button type="button" onClick={resetWorkExpForm} className="dashboard-cancel-button">
              Cancel
            </button>
            <button type="submit" className="dashboard-submit-button">
              {editingWorkExp ? 'Update Work Experience' : 'Add Work Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderSkillsForm = () => (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal-content dashboard-modal-content-wide">
        <div className="dashboard-modal-header">
          <h3>{editingSkillGroup ? 'Edit Skill Group' : 'Add Skill Group'}</h3>
          <button onClick={resetSkillsForm} className="dashboard-close-button">×</button>
        </div>
        
        <form onSubmit={handleSubmitSkills} className="dashboard-form">
          <div className="dashboard-form-group">
            <label className="dashboard-label">Group Title *</label>
            <input
              type="text"
              name="title"
              value={skillsFormData.title}
              onChange={handleSkillsInputChange}
              placeholder="e.g., Frontend, Backend, Tools"
              required
              className="dashboard-input"
            />
          </div>
          
          <div className="dashboard-form-group">
            <label className="dashboard-label">Skills *</label>
            <div className="dashboard-skills-container">
              {skillsFormData.skills.map((skillItem, index) => (
                <div key={index} className="dashboard-skill-item">
                  <div className="dashboard-skill-inputs">
                    <input
                      type="text"
                      placeholder="Skill name (e.g., React.js)"
                      value={skillItem.skill}
                      onChange={(e) => handleSkillItemChange(index, 'skill', e.target.value)}
                      className="dashboard-input"
                      required
                    />
                    
                    <div className="dashboard-skill-icon-upload">
                      {skillIconsPreview[index] ? (
                        <div className="dashboard-skill-icon-preview-container">
                          <img 
                            src={skillIconsPreview[index]} 
                            alt="Skill icon preview" 
                            className="dashboard-skill-icon-preview"
                          />
                          <button 
                            type="button"
                            onClick={() => removeSkillIcon(index)}
                            className="dashboard-remove-skill-icon-button"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="dashboard-file-input-container">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSkillIconChange(index, e.target.files[0])}
                            className="dashboard-file-input"
                            id={`skill-icon-${index}`}
                          />
                          <label htmlFor={`skill-icon-${index}`} className="dashboard-file-input-label">
                            <div className="dashboard-upload-area dashboard-upload-area-small">
                              <span className="dashboard-upload-icon">🖼️</span>
                              <span>Skill Icon</span>
                              <small className="dashboard-upload-hint">Max 2MB</small>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  {skillsFormData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkillItem(index)}
                      className="dashboard-remove-skill-button"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSkillItem}
                className="dashboard-add-skill-button"
              >
                + Add Another Skill
              </button>
            </div>
          </div>
          
          <div className="dashboard-form-actions">
            <button type="button" onClick={resetSkillsForm} className="dashboard-cancel-button">
              Cancel
            </button>
            <button type="submit" className="dashboard-submit-button">
              {editingSkillGroup ? 'Update Skill Group' : 'Add Skill Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container">
        <div className="dashboard-loading-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-container">
        <div className="dashboard-box scroll-animate visible">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard</h1>
            <button onClick={handleLogout} className="dashboard-logout-button">
              Logout
            </button>
          </div>

          <div className="dashboard-welcome-section">
            <h2 className="dashboard-welcome-text">Welcome back!</h2>
            <div className="dashboard-user-info">
              <div className="dashboard-info-row">
                <span className="dashboard-info-label">Email:</span>
                <span className="dashboard-info-value">{user?.email}</span>
              </div>
              <div className="dashboard-info-row">
                <span className="dashboard-info-label">User ID:</span>
                <span className="dashboard-info-value">{user?.uid}</span>
              </div>
              <div className="dashboard-info-row">
                <span className="dashboard-info-label">Account Created:</span>
                <span className="dashboard-info-value">
                  {formatDate(user?.metadata?.creationTime)}
                </span>
              </div>
              <div className="dashboard-info-row">
                <span className="dashboard-info-label">Last Sign In:</span>
                <span className="dashboard-info-value">
                  {formatDate(user?.metadata?.lastSignInTime)}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-actions-section">
            <h3 className="dashboard-section-title">Quick Actions</h3>
            <div className="dashboard-action-buttons">
              <button 
                className="dashboard-action-button"
                onClick={() => navigate('/')}
              >
                Go to Portfolio
              </button>
              <button 
                className="dashboard-action-button"
                onClick={() => {
                  setActiveTab('projects');
                  setShowProjectForm(true);
                }}
              >
                Add New Project
              </button>
              <button 
                className="dashboard-action-button"
                onClick={() => {
                  setActiveTab('workExperience');
                  setShowWorkExpForm(true);
                }}
              >
                Add Work Experience
              </button>
              <button 
                className="dashboard-action-button"
                onClick={() => {
                  setActiveTab('skills');
                  setShowSkillsForm(true);
                }}
              >
                Add Skills Group
              </button>
            </div>
          </div>

          {renderTabs()}

          {activeTab === 'projects' && renderProjectsSection()}
          {activeTab === 'workExperience' && renderWorkExperienceSection()}
          {activeTab === 'skills' && renderSkillsSection()}

          {showProjectForm && renderProjectForm()}
          {showWorkExpForm && renderWorkExpForm()}
          {showSkillsForm && renderSkillsForm()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;