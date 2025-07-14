export default function Footer() {
    return (
      <footer className="border-t bg-white text-xs text-gray-500">
        <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-4">
          <div>© 2025 ARTINUS. All rights reserved.</div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">개인정보처리방침</a>
            <a href="#" className="hover:underline">통신판매업신고</a>
            <a href="#" className="hover:underline">문의하기</a>
          </div>
        </div>
      </footer>
    );
  }
  