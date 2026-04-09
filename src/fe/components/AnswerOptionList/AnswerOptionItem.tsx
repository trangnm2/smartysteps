// KHONG SUA KHI DOI GAME
import { useRef, useEffect } from "react";
import "./AnswerOptionItem.css";
import HtmlContentRenderer from "@/fe/components/ContentRenderer/HtmlContentRenderer";

interface AnswerOptionItemProps {
  answer: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  isDisabled: boolean;
  isAnswered: boolean;
  correctIndex?: number;
  onClick: () => void;
}

const AnswerOptionItem = ({
  answer,
  index,
  isSelected,
  isCorrect,
  isDisabled,
  isAnswered,
  correctIndex = -1,
  onClick,
}: AnswerOptionItemProps) => {
  const getContainerClass = (): string => {
    let classes = "answer-container";

    if (isAnswered) {
      if ((correctIndex >= 0 && index === correctIndex) || (isSelected && isCorrect)) {
        classes += " correct";
      } else if (isSelected && !isCorrect) {
        classes += " wrong selected";
      }
    } else {
      if (isSelected) {
        classes += " selected";
      }
    }

    return classes;
  };

  const MAX_VISIBLE_LINES = 3;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number | null = null;

    const measureAndCap = () => {
      rafId = null;
      const isMobile = document.body.classList.contains('is-mobile');

      // Luôn xoá inline styles cũ trước để tránh stale khi chuyển device type
      el.style.maxHeight = '';
      el.style.overflowY = '';
      const container = el.closest('.answer-container') as HTMLElement;
      if (container) container.style.maxHeight = '';

      if (isMobile) {
        if (!container) return;

        // Temporarily static to measure natural content height (no spacers)
        el.style.position = 'static';
        el.style.display = 'block';
        void el.offsetHeight;

        const style = getComputedStyle(el);
        const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
        const capHeight = Math.ceil(lineHeight * MAX_VISIBLE_LINES);
        const naturalHeight = el.scrollHeight;

        // Restore CSS
        el.style.position = '';
        el.style.display = '';

        const targetH = Math.min(naturalHeight, capHeight);
        const cs = getComputedStyle(container);
        const padTop = parseFloat(cs.paddingTop) || 0;
        const padBot = parseFloat(cs.paddingBottom) || 0;
        const label = container.querySelector('.answer-label') as HTMLElement;
        const labelH = label ? label.offsetHeight : 0;

        container.style.maxHeight = `${Math.max(targetH, labelH) + padTop + padBot}px`;

        el.style.overflowY = 'auto';
      } else {
        // PC: content-sized box, cap at 3 lines
        void el.offsetHeight;

        const style = getComputedStyle(el);
        const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
        const capHeight = Math.ceil(lineHeight * MAX_VISIBLE_LINES);

        if (el.scrollHeight > capHeight + 2) {
          el.style.maxHeight = `${capHeight}px`;
          el.style.overflowY = 'auto';
        }
      }
    };

    const schedule = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(measureAndCap);
    };

    schedule();

    const mo = new MutationObserver(schedule);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    window.addEventListener('resize', schedule);

    // Watch body class changes (is-mobile toggle) để re-run khi device type chuyển
    const bodyMo = new MutationObserver(schedule);
    bodyMo.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      mo.disconnect();
      bodyMo.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, [answer]);

  const labels = ["A", "B", "C", "D"];

  return (
    <div
      onClick={() => !isDisabled && onClick()}
      className={getContainerClass()}
      style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
    >
      <span className="answer-label">
        {labels[index] ?? index + 1}
      </span>
      <div className="answer-text">
        <div className="answer-text-scroll" ref={scrollRef}>
          <HtmlContentRenderer html={answer} />
        </div>
      </div>
    </div>
  );
};

export default AnswerOptionItem;
