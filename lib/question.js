import { Questions } from "../models";

export const searchQuestion = async (string) => {
  const result = await Questions.find({
    $text: { $search: string },
  });
  return result;
};

// export const searchQuestionExact = async (string) => {
//   const result = await Questions.find({
//     questionDescription: string,
//   });
//   return result;
// };

export const createQuestion = async (body) => {
  let createQuestionResponse = await Questions.create({
    questionTitle: body.questionTitle,
    questionDescription: body.questionDescription,
    userId: body.userId,
    communityId: body.communityId,
    questionType: body.questionType
  });
  return createQuestionResponse;
};
