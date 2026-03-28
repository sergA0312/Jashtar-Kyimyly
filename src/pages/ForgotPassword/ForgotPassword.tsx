import React, { useState } from "react";
import { MailIcon } from "lucide-react";
import styles from "./ForgotPassword.module.scss";
import authimage from "@/shared/assets/images/authImage.png";
import { useForgotPasswordStore } from "@/app/store/auth/ForgotPassword";
import { useNavigate } from "react-router-dom";

interface FormData {
    email: string;
}

export const ForgotPassword = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
    });
    const navigate = useNavigate()

    const { loading, error, success, forgotPassword } = useForgotPasswordStore();

    const handleChange = (value: string) => {
        setFormData({ email: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email.includes("@")) {
            alert("Некорректный email");
            return;
        }

        await forgotPassword({ email: formData.email });
    };

    if(success) {
        navigate("/verify-code")
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h1 className={styles.title}>Сброс пароля</h1>
                <p className={styles.subtitle}>
                    Введите ваш email, и мы отправим вам код для сброса пароля.
                </p>
                {/* Email */}
                <div className={`${styles.fieldContainer} ${styles.large}`}>
                    <label className={styles.label}>
                        Email<span className={styles.required}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                        <MailIcon className={styles.icon} />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="example@mail.com"
                            className={styles.input}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Кнопка */}
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    <span className={styles.buttonText}>
                        {loading ? "Отправляем..." : "Отправить"}
                    </span>
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && (
                    <p style={{ color: "green" }}>
                        Письмо для сброса пароля отправлено на {formData.email}
                    </p>
                )}
            </form>

            <img className={styles.backgroundImage} alt="Background" src={authimage} />
        </div>
    );
};
