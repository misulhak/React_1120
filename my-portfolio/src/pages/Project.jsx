import './Project.css'; // Project.css 파일을 불러옵니다.

function Project() {
    // 예시 프로젝트 데이터
    const projectsList = [
        { id: 2, title: "(예시)할 일 목록 앱", description: "JavaScript로 만든 기본적인 할 일 관리 웹 애플리케이션입니다.", tags: ["JavaScript", "HTML"] },
        { id: 3, title: "(예시)날씨 정보 앱", description: "외부 API를 사용하여 실시간 날씨 정보를 표시합니다.", tags: ["React", "API", "Axios"] },
    ];

    return (
        <div className="projects-container">
            <h2 className="projects-title">나의 프로젝트들</h2>

            <div className="projects-grid">
                {/* JavaScript의 map 함수를 사용하여 프로젝트 목록을 동적으로 렌더링합니다 */}
                {projectsList.map((project) => (
                    <div key={project.id} className="project-card">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="project-tags">
                            {project.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Project;