import React, { useState, useEffect } from "react";
import styles from "./NewPassword.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";
import authimage from "@/shared/assets/images/authImage.png";
import { useForgotPasswordStore } from "@/app/store/auth/ForgotPassword";

interface FormData {
    password: string;
    token: string;
}

export function NewPassword() {
    const { code } = useParams(); // токен из URL
    const [formData, setFormData] = useState<FormData>({
        password: "",
        token: code || "", // сразу подставляем токен из params
    });
    const navigate = useNavigate();
    const [visiblePassword, setVisiblePassword] = useState(false);

    const { setNewPassword, loading, error, success } = useForgotPasswordStore();

    const handleChange = (value: string) => {
        setFormData((prev) => ({ ...prev, password: value }));
    };

    const togglePasswordVisibility = () => {
        setVisiblePassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: string[] = [];

        if (formData.password.length < 8) {
            errors.push("Пароль должен содержать минимум 8 символов");
        }

        if (!formData.token) {
            errors.push("Токен не найден. Попробуйте снова через email.");
        }

        if (errors.length > 0) {
            alert("Ошибки в форме:\n" + errors.join("\n"));
            return;
        }

        // Отправка токена и нового пароля на API
        await setNewPassword({
            token: formData.token,
            password: formData.password,
        });
    };

    useEffect(() => {
        if (success) {
            navigate("/profile");
            useForgotPasswordStore.getState().logout();
            alert("Пароль успешно обнавлен")
        }
    }, [success, navigate]);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h1 className={styles.title}>Сброс пароля</h1>
                <p className={styles.subtitle}>
                    Введите новый пароль
                </p>

                {/* Новый пароль */}
                <div className={`${styles.fieldContainer} ${styles.large}`}>
                    <label className={styles.label}>
                        Новый пароль<span className={styles.required}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={visiblePassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="Введите новый пароль"
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={styles.tokenToggle}
                        >
                            {visiblePassword ? (
                                <EyeIcon className={styles.icon} />
                            ) : (
                                <EyeOffIcon className={styles.icon} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Кнопка */}
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    <span className={styles.buttonText}>
                        {loading ? "Сохраняем..." : "Продолжить"}
                    </span>
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Пароль успешно обновлён!</p>}
            </form>

            <img className={styles.backgroundImage} alt="Background" src={authimage} />
        </div>
    );
}
