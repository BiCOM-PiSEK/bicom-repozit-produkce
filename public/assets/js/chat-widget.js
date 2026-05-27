/*
  Bicom Písek — AI Rádce Chatbot Widget (chat-widget.js)
  Spravuje plovoucí chatovací widget, asynchronní dotazy na AI Rádce (/api/chat) a historii.
*/

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chat-widget-container");
  const launcher = document.getElementById("chat-launcher");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messagesArea = document.getElementById("chat-messages");

  // Load conversation ID from session storage or generate one
  let conversationId = sessionStorage.getItem("chat-conv-id") || null;

  // Toggle chat window visibility
  launcher.addEventListener("click", () => {
    container.classList.toggle("chat-active");
    
    const isActive = container.classList.contains("chat-active");
    launcher.setAttribute("aria-expanded", isActive ? "true" : "false");

    if (isActive) {
      setTimeout(() => {
        input.focus();
        scrollChatToBottom();
      }, 300);
    }
  });

  // Handle form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    // 1. Add user bubble
    appendMessage(text, "user");
    input.value = "";
    scrollChatToBottom();

    // 2. Add loading bubble
    const loadingBubble = appendLoadingIndicator();
    scrollChatToBottom();

    try {
      // 3. Post to API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationId: conversationId
        })
      });

      const result = await res.json();
      
      // Remove loading indicator
      loadingBubble.remove();

      if (res.ok && result.success) {
        // Save conversation ID
        if (result.conversationId) {
          conversationId = result.conversationId;
          sessionStorage.setItem("chat-conv-id", conversationId);
        }
        
        // 4. Add agent bubble (format response)
        appendMessage(result.reply, "agent");
      } else {
        appendMessage(result.error || "Omlouvám se, spojení se nezdařilo. Zkuste to prosím znovu.", "agent");
      }
    } catch (err) {
      console.error("[chat-widget] Error posting message:", err);
      loadingBubble.remove();
      appendMessage("Omlouvám se, nepodařilo se navázat spojení se serverem. Zkontrolujte své připojení.", "agent");
    } finally {
      scrollChatToBottom();
    }
  });

  /**
   * Helper to format simple markdown patterns (**bold**, newlines).
   */
  function formatMarkdown(text) {
    if (!text) return '';
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Convert **bold** to <strong>bold</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Convert newlines to <br>
    html = html.replace(/\n/g, "<br>");

    return html;
  }

  /**
   * Appends a text message bubble.
   */
  function appendMessage(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble-${sender}`;
    
    if (sender === "agent") {
      bubble.innerHTML = formatMarkdown(text);
    } else {
      bubble.textContent = text;
    }
    
    messagesArea.appendChild(bubble);
  }

  /**
   * Appends a loading bubble with three dots.
   */
  function appendLoadingIndicator() {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble chat-bubble-loading";
    
    bubble.innerHTML = `
      <div class="chat-dot"></div>
      <div class="chat-dot"></div>
      <div class="chat-dot"></div>
    `;
    
    messagesArea.appendChild(bubble);
    return bubble;
  }

  /**
   * Scrolls message area to bottom.
   */
  function scrollChatToBottom() {
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }
});
