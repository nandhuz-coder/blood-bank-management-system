import { jsPDF } from "jspdf";

const CertificateGenerator = ({ user, donationDate, hospital }) => {
    const generateCertificate = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = "/IMG-20250323-WA0085.jpg"; // Ensure this image is in the public folder

        img.onload = () => {
            // Set canvas size to match the image
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.font = "bold 48px Arial";
            ctx.fillStyle = "Black";
            ctx.textAlign = "center";
            ctx.fillText(user, canvas.width / 2, 450); 

            // Add donation details
            ctx.font = "italic 20px Arial";
            ctx.fillText(`Hospital: ${hospital}, Donation Date: ${new Date(donationDate).toLocaleDateString()}`, canvas.width / 2, 490);

            // Add closing message
            ctx.font = "italic 20px Arial";
            ctx.fillText("Together, we save lives!", canvas.width / 2, 860);

            // Convert to image and generate PDF
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("landscape", "mm", "a4");
            pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
            pdf.save(`Blood_Donation_Certificate_${user}.pdf`);
        };
    };

    generateCertificate();
};

export default CertificateGenerator;
