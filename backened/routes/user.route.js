import express from 'express';
import { signUp, login, logout } from '../controllers/common/user.controller.js';
import { saveHospitalDetails } from '../controllers/hospital/hospital.controller.js';
import { manageInventory } from '../controllers/hospital/inventory.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/rolebasedauth.middleware.js';
import { manageDoctors,getDoctors,updateDoctor } from '../controllers/hospital/doctor.controller.js';
import { getAllAdmittedPatients,getPatientDetailsByDisease,getPatientsByDisease } from '../controllers/hospital/patient.controller.js';
import { manageBeds,updateBed,getBeds } from '../controllers/hospital/bed.controller.js';
import { searchHospitalByDisease } from '../controllers/patient/searchbydisease.js';
import { searchHospitalByName } from '../controllers/patient/searchbyhospital.js';
import { bookDoctorAndBed } from '../controllers/patient/book.js';
import { submitPatientFormAndFindHospital } from '../controllers/patient/submitpatient.controller.js';

const router = express.Router();


router.post('/register', signUp);
router.post('/login', login);
router.post('/logout', verifyJWT, logout);


router.post('/hospital/details', verifyJWT, authorizeRole(['hospital']), saveHospitalDetails);


router.post('/inventory/add', verifyJWT, authorizeRole(['hospital']), manageInventory); 
router.put('/inventory/update/:id', verifyJWT, authorizeRole(['hospital']), manageInventory); 
router.get('/inventory/list', verifyJWT, authorizeRole(['hospital']), manageInventory);


router.post('/doctors/add', verifyJWT, authorizeRole(['hospital']), manageDoctors); 
router.put('/doctors/:id', verifyJWT, authorizeRole(['hospital']), updateDoctor); 
router.get('/doctors', verifyJWT, authorizeRole(['hospital']), getDoctors); 


router.get('/patients/disease', verifyJWT, authorizeRole(['hospital']), getPatientsByDisease); 
router.get('/patients/disease/:disease', verifyJWT, authorizeRole(['hospital']), getPatientDetailsByDisease); 
router.get('/patients', verifyJWT, authorizeRole(['hospital']), getAllAdmittedPatients); 


router.post('/beds', verifyJWT, authorizeRole(['hospital']), manageBeds); 
router.put('/beds/:bedId', verifyJWT, authorizeRole(['hospital']), updateBed); 
router.get('/beds', verifyJWT, authorizeRole(['hospital']), getBeds); 


router.post('/search-hospital-by-disease', verifyJWT, authorizeRole(['patient']), searchHospitalByDisease);
router.post('/search-hospital-by-name', verifyJWT, authorizeRole(['patient']), searchHospitalByName);
router.post('/book-doctor-and-bed', verifyJWT, authorizeRole(['patient']), bookDoctorAndBed);
router.post('/submit-patient-form', verifyJWT, authorizeRole(['patient']), submitPatientFormAndFindHospital);



export default router;
