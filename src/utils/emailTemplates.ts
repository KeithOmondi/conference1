// utils/emailTemplates.ts (recommended) or inside authController.ts

export const generateWelcomeEmail = (user: any) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the High Court Annual Summit</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

        <!-- Header -->
        <div style="background-color: #005A2B; color: #ffffff; padding: 25px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">
                High Court Annual Summit 2025
            </h1>
        </div>

        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">

            <p style="font-size: 16px; margin-top: 0;">
                Dear <strong style="color: #005A2B;">${user.name}</strong>,
            </p>

            <p style="font-size: 16px;">
                We extend a warm welcome to the 
                <strong style="color: #005A2B;">High Court Annual Summit 2025</strong>. 
                We are delighted to have your presence as part of this important gathering.
            </p>

            <div style="
                margin: 30px 0; 
                padding: 20px; 
                border-left: 5px solid #C6A64F; 
                background-color: #FFF9E8; 
                border-radius: 4px;
            ">
                <h4 style="
                    margin-top: 0; 
                    margin-bottom: 15px; 
                    color: #005A2B; 
                    font-size: 18px; 
                    border-bottom: 1px dashed #C6A64F; 
                    padding-bottom: 10px;
                ">
                    Login Details
                </h4>

                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>Role:</strong> 
                    <span style="color: #005A2B; font-weight: bold;">${user.role}</span>
                </p>

                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>Station:</strong> ${user.station || "N/A"}
                </p>

                <p style="margin: 5px 0; font-size: 14px;">
                    <strong>Email:</strong> ${user.email || "N/A"}
                </p>
            </div>

            <p style="font-size: 16px;">
                Wishing you a productive and enjoyable summit.
            </p>
        </div>

        <div style="background-color: #f4f4f4; padding: 20px 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 12px; color: #666;">
                Office of the Registrar High Court
            </p>
            <p style="margin: 5px 0 0; font-size: 10px; color: #999;">
                This is an automated message. Please do not reply.
            </p>
        </div>

    </div>

</body>
</html>
`;
};
