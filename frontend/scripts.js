function navigateTo(page) {
    fetch(`${page}.html`)
      .then(response => response.text())
      .then(data => {
        document.getElementById('content').innerHTML = data;
        if (page === 'algebra') {
          loadAlgebraGraph();
        } else if (page === 'geometry') {
          loadGeometryCanvas();
        } else if (page === 'trigonometry') {
          loadTrigonometryCanvas();
        } else if (page === 'calculus') {
          loadCalculusCanvas();
        }
      });
  }
  
  function loadAlgebraGraph() {
    const canvas = document.getElementById('algebraGraph');
    if (canvas) {
      // Implement interactive graph rendering here
    }
  }
  
  function loadGeometryCanvas() {
    const canvas = document.getElementById('geometryCanvas');
    if (canvas) {
      // Implement geometric visualizations here
    }
  }
  
  function loadTrigonometryCanvas() {
    const canvas = document.getElementById('trigonometryCanvas');
    if (canvas) {
      // Implement trigonometric visualizations here
    }
  }
  
  function loadCalculusCanvas() {
    const canvas = document.getElementById('calculusCanvas');
    if (canvas) {
      // Implement calculus visualizations here
    }
  }
  
  // Initial load
  navigateTo('home');

  //ddd
  