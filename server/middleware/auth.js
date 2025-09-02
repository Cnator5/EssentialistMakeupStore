// import jwt from 'jsonwebtoken'

// const auth = async(request,response,next)=>{
//     try {
//         const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1] //["Bearer", "token"]
       
//         if(!token){
//             return response.status(401).json({
//                 message : "Provide token"
//                 // message : "Please login to have access",
//             })
//         }

//         const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

//         if(!decode){
//             return response.status(401).json({
//                 message : "unauthorized access", 
//                 error : true,
//                 success : false
//             })
//         }

//         request.userId = decode.id

//         next()

//     } catch (error) {
//         return response.status(500).json({
//             message : "You have not login",///error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export default auth



import jwt from 'jsonwebtoken';

const auth = async (request, response, next) => {
  try {
    // Check for token in cookies or Authorization header
    const token = request.cookies.accessToken || 
                 (request.headers.authorization && request.headers.authorization.startsWith('Bearer') 
                    ? request.headers.authorization.split(" ")[1] 
                    : null);
    
    if (!token) {
      return response.status(401).json({
        message: "Authentication required. Please log in.",
        error: true,
        success: false
      });
    }

    try {
      // Verify token
      const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
      
      if (!decode) {
        return response.status(401).json({
          message: "Invalid authentication token",
          error: true,
          success: false
        });
      }
      
      // Check token expiration
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decode.exp && decode.exp < currentTimestamp) {
        return response.status(401).json({
          message: "Authentication token has expired. Please log in again.",
          error: true,
          success: false
        });
      }

      // Set user ID for use in downstream middleware/routes
      request.userId = decode.id;
      
      // Add role if available
      if (decode.role) {
        request.userRole = decode.role;
      }
      
      next();
    } catch (jwtError) {
      // Handle different JWT errors
      if (jwtError.name === 'TokenExpiredError') {
        return response.status(401).json({
          message: "Authentication token has expired. Please log in again.",
          error: true,
          success: false
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        return response.status(401).json({
          message: "Invalid authentication token",
          error: true,
          success: false
        });
      } else {
        throw jwtError; // Re-throw unknown errors
      }
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return response.status(500).json({
      message: "Authentication failed",
      error: true,
      success: false
    });
  }
};

export default auth;