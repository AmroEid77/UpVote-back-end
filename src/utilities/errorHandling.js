export const asyncHandler = (functionToHandle)=>{


    return (req,res,next)=>{
        functionToHandle(req,res,next).catch(err=>{
            return next(new Error(err));
        })
    }
}

export const globalErrorHandler = (err,req,res,next)=>{// global error handler 
    if(err) {
        return res.json({message:err.message || "invalid format"});
    }
}