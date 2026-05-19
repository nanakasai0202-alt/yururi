const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxG7wlDGlgszSuO_y-mV9yOeb1IbTvMwHjtA29nevi3ww3y6ZFai-lr24IKwC4w0b0c/exec";
const LINE_URL = "https://lin.ee/TsRYLeT"; // 公式LINEのURLに変更

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reserveForm");
    const thanksMessage = document.getElementById("thanksMessage");
    const submitButton = document.querySelector(".submit-button");

    if (!form || !thanksMessage || !submitButton) {
        console.error("フォーム要素が見つかりません。HTMLのid/classを確認してください。");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "送信中です...";

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.submittedAt = new Date().toLocaleString("ja-JP");

        try {
            await fetch(GAS_WEB_APP_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(data),
            });

            form.style.display = "none";
            thanksMessage.style.display = "block";

            thanksMessage.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            setTimeout(() => {
                window.location.href = LINE_URL;
            }, 2500);

        } catch (error) {
            console.error(error);
            alert("送信に失敗しました。時間をおいて再度お試しください。");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "上記内容で送信する";
        }
    });
});