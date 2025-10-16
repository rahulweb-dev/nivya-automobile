import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    salutation: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String },
    address: { type: String },
    lastCompany: { type: String },
    jobTitle: { type: String },
    jobLocation: { type: String },
    totalExperience: { type: String },
    profileSummary: { type: String },
    skills: { type: String },
    currentCTC: { type: String },
    expectedCTC: { type: String },
    lastDrawnSalary: { type: String },
    qualification: { type: String },
    resumeLink: { type: String, required: true },
  },
  { timestamps: true }
);
const Career = mongoose.models.career || mongoose.model('career', Schema);
export default Career;
