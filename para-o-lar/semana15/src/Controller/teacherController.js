//const { response } = require("../app");
//const teacherSchemas = require("../Model/teacherSchema")
const teacherSchema = require("../Model/teacherSchema");
const bcrypt = require("bcrypt");

const getAllTeacher = async (request, response) => {
    try {
        const allTeacher = await teacherSchemas.find();
        response.status(200).send(allTeacher);
    } catch (error) {
        console.error(err)
    }
}

const createTeacher = async (request, response) => {
    //const { name, subject, school, classrooms, createAt} = request.body;
    try {
      const newTeacher = new teacherSchema({
            name: request.body.name,
            subject: request.body.subject,
            school: request.body.school,
            classrooms: request.body.classrooms,
            createAt: new Date()
        })
       // consolog.log("New teacher", newTeacher)
        const savedTeacher = await newTeacher.save()
        if(savedTeacher){ 
        response.status(201).send({
            "message": "New teacher created successfully",
            savedTeacher
        })
    }
} catch(err) {
     console.error(err);
    }
 };

 
 const updateTeacher = async ( request, response) => {
    try {
       const findTeacher = await teacherSchema.findById(request.params.id)
       if(!findTeacher){
        response.status(404).send({
            "message": "teacher not found",
             "statusCode":404
        })
       }

       findTeacher.name = request.body.name || findTeacher.name
       findTeacher.subject = request.body.subject || findTeacher.subject

       console.log("Teacher updated", findTeacher)
       const savedTeacher = await findTeacher.save()

       response.status(200).send({
        "message": "Teacher updated successfully",
         savedTeacher
       })
    } catch (error) {
       console.error(err);
    }
 };

 const deleteTeacher = async (request,response) => {
    try {
        const deletedTeacher = await teacherSchema.findByIdAndDelete(request.params.id)

        response.status(200).send({
            "message": "teacher deleted",
            deletedTeacher
        })
    } catch(err) {
        console.error(err);
    }
};



module.exports = {
    getAllTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
}