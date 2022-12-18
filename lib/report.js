import { Answer, Questions, Reports } from "../models";

export const findviaQuestion = async ({ type, questionId, userId }) => {
  try {
    let findData = await Reports.findOne({ type, questionId, userId });
    return findData;
  } catch (error) {
    console.log(error);
    return false
  }
};

export const findviaAnswer = async ({ type, answerId, userId }) => {
  try {
    let findData = await Reports.findOne({ type, questionId, userId });
    return findData;
  } catch (error) {
    console.log(error);
    return false
  }
};

export const reportViaQuestion = async ({
  type,
  questionId,
  userId,
  reason,
}) => {
  console.log("Runs report ....");
  try {
    let createReport = await Reports.create({
      type,
      questionId,
      userId,
      reason,
      answerId:""
    });
    let question = await Questions.findOne({ _id: questionId });
    let updateReports = await Questions.updateOne(
      { _id: question._id },
      { $set: { reports: question.reports + 1 } }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
};

export const reportViaAnswer = async ({ type, answerId, userId, reason }) => {
  try {
    let createReport = await Reports.create({
      type,
      answerId,
      userId,
      reason,
    });
    let answer = await Answer.findOne({ _id: answerId });
    let updateReports = await Answer.updateOne(
      { _id: answer._id },
      { $set: { reports: answer.reports + 1 } }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
};
