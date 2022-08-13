const Jobdata = require("../models/Job")
const { StatusCodes } = require("http-status-codes")
const badReq = require("../error/badReq")
const idRegEx = require("../config/idRegEx")
const unAuth = require("../error/unAuth")

const getAllJobs = async (req, res) => {
  const { company, position, sort, select } = req.query
  let queryList = {}
  if(company) {
    queryList.company = company
  }
  if(position) {
    queryList.position = position
  }
  let result = Jobdata.find(queryList)
  if(sort) {
    const sortList = sort.split(",").join(" ")
    result = result.sort(sortList)
  } else {
    result = result.sort("createdAt")
  }
  if(select) {
    const selectList = select.split(",").join(" ")
    result = result.select(selectList)
  }
  const jobs = await result 
  res.status(StatusCodes.OK).json({ jobs })
}

const createJob = async (req, res) => {
  const { company, position } = req.body
  if(!company || !position) throw new badReq("Provide both the company name and the position")
  const result = await Jobdata.create(req.body)
  res.status(StatusCodes.CREATED).json({ result })
}

const getJob = async (req, res) => {
  const { id } = req.params
  const match = idRegEx.test(id)
  if(!match) {
    throw new badReq("Enter a valid id")
  }
  const foundJob = await Jobdata.findOne({ _id: id }).exec()
  if(!foundJob) throw new unAuth(`No job found with ID ${id}`)
  res.status(StatusCodes.OK).json({ foundJob })
}

const updateJob = async (req, res) => {
  const { 
    body: { company, position }, 
    params: { id } } = req
const match = idRegEx.test(id)
  if(!match) {
    throw new badReq("Enter a valid id")
  }
  const foundJob = await Jobdata.findOne({ _id: id }).exec()
  if(!foundJob) throw new unAuth(`No job found with ID ${id}`)
  console.log(req.body)
  if(!company || ! position) throw new badReq("Company and position must be provided")
  const update = await Jobdata.updateOne({ company: company, position: position, new: true })
  await foundJob.save()
  res.status(StatusCodes.OK).json({ update })
}

const deleteJob = async (req, res) => {
  const { id } = req.params
const match = idRegEx.test(id)
  if(!match) {
    throw new badReq("Enter a valid id")
  }
  const foundJob = await Jobdata.findOne({ _id: id }).exec()
  if(!foundJob) throw new unAuth(`No job found with ID ${id}`)
  await Jobdata.deleteOne({ _id: id })
  res.status(StatusCodes.OK).json({ msg: `Job with Id ${id} deleted`})
}

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
}