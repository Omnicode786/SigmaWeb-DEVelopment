document.addEventListener('DOMContentLoaded', () => {
  // submit comment
  const submitBtn = document.getElementById('submit-comment');
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const threadId = submitBtn.dataset.threadId;
      const content = document.getElementById('new-comment-content').value.trim();
      if (!content) return alert('Enter comment');
      const res = await fetch(`/api/threads/${threadId}/comments`, {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ content })
      });
      const j = await res.json();
      if (!j.success) return alert(j.error || 'Error');
      // reload page to show sorted comments (simpler)
      location.reload();
    });
  }

  // show reply form
  document.querySelectorAll('.show-reply-form').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      const form = document.getElementById('reply-form-' + id);
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });
  });

  // submit reply
  document.querySelectorAll('.submit-reply').forEach(btn => {
    btn.addEventListener('click', async () => {
      const commentId = btn.dataset.id;
      const textarea = btn.parentElement.querySelector('.reply-content');
      const content = textarea.value.trim();
      if (!content) return alert('Enter reply');
      const res = await fetch(`/api/comments/${commentId}/replies`, {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ content })
      });
      const j = await res.json();
      if (!j.success) return alert(j.error || 'Error');
      location.reload();
    });
  });

  // upvote comment
  document.querySelectorAll('.upvote-comment').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const res = await fetch(`/api/comments/${id}/upvote`, { method: 'POST' });
      const j = await res.json();
      if (!j.success) return alert(j.error || 'Error');
      btn.nextElementSibling.textContent = j.upvotes;
      // reload sorting
      location.reload();
    });
  });

  // upvote reply
  document.querySelectorAll('.upvote-reply').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const res = await fetch(`/api/replies/${id}/upvote`, { method: 'POST' });
      const j = await res.json();
      if (!j.success) return alert(j.error || 'Error');
      btn.nextElementSibling.textContent = j.upvotes;
      location.reload();
    });
  });
});
