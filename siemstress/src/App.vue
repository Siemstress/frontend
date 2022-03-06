<template>
  <!-- app wrapper, switches between showing a sidebar/navbar layout depending on viewport width -->
  <div id="app" class="min-vh-100 min-vw-100 d-flex flex-column flex-lg-row">
    <!-- nav (sidebar/navbar) -->
    <aside id="sidebar" class="d-flex flex-row flex-lg-column justify-content-between justify-content-lg-start bg-light text-dark">
      <!-- brand/logo -->
      <span class="d-flex p-2 pb-2 px-sm-4" style="font-size: 36px;">
        SIEMstress
        <hr>
      </span>
      <!-- menu layout -->
      <nav class="position-relative d-flex align-items-center justify-content-lg-start px-2 px-sm-3">
        <!-- sidebar nav separator -->
        <hr class="d-none d-lg-block sidebar-divider my-0">
        <!-- menu -->
        <ul class="flex-row flex-lg-column nav list-unstyled w-100">
          <!-- dashboard -->
          <li class="nav-link mx-1 my-lg-2 mt-lg-3">
            <span class="d-block ps-lg-1">
              <i class="bi bi-grid-1x2-fill icon-fw pe-1 pe-lg-2"></i>
              <span class="d-none d-md-inline">Dashboard</span>
            </span>
          </li>
          <!-- agents -->
          <li class="nav-link dropdown mx-1 my-lg-2">
            <span class="d-block ps-lg-1 collapsed" data-bs-toggle="collapse" data-bs-target="#submenu-agents-toggle">
              <i class="bi bi-pc-display-horizontal icon-fw pe-1 pe-lg-2"></i>
              <span class="d-none d-md-inline">Agents</span>
            </span>
            <ul id="submenu-agents-toggle" class="sub-menu collapse">
              <li class="nav-link">List Agents...</li>
              <li><hr class="dropdown-divider"></li>
              <li class="nav-link">
                <i class="bi bi-plus-circle icon-fw pe-1"></i>
                Add New Agent
              </li>
            </ul>
          </li>
          <!-- reports -->
          <li class="nav-link dropdown mx-1 my-lg-2">
            <span class="d-block ps-lg-1 collapsed" data-bs-toggle="collapse" data-bs-target="#submenu-reports-toggle">
              <i class="bi bi-clipboard2-data icon-fw pe-1 pe-lg-2"></i>
              <span class="d-none d-md-inline">Reports</span>
            </span>
            <ul id="submenu-reports-toggle" class="sub-menu collapse">
              <li class="nav-link">List Reports...</li>
              <li><hr class="dropdown-divider"></li>
              <li class="nav-link">
                <i class="bi bi-plus-circle icon-fw pe-1"></i>
                Add New Report
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
    <!-- main content -->
    <main id="page" class="col bg-white p-2">
      <Dashboard/>
    </main>
  </div>
</template>

<script>
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "@popperjs/core"
import "echarts"
import Dashboard from "./components/Dashboard";

export default {
  name: 'App',
    components: {
      WorldMap,
      Dashboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/* sidebar logo (heading image) */
#sidebar .brand-logo {

}
/* sidebar link styling */
#sidebar nav > ul > .nav-link {
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 18px;
  transition: all 0.2s ease-in-out;
}
#sidebar nav > ul > .nav-link:hover {
  background: rgba(0,0,0,0.05);
  color: #0d4ba5;
}
#sidebar nav > ul > .nav-link.active {
  background: rgba(0,0,0,0.1);
  border-color: rgba(0,0,0,0.15);
  color: #0d4ba5;
  font-weight: bold;
}
/* sidebar <hr> */
#sidebar .sidebar-divider {
  position: absolute;
  top: -7px;
  left: calc((100% - 90%) / 2);
  height: 1px;
  width: 90%;
  border-bottom: 2px solid black;
}
/* sub-menu styling + tweaks */
#sidebar .sub-menu {
  margin-left: 0.25em !important;
  padding-left: 0.25em !important;
  list-style: none;
  font-size: 16px;
  font-weight: initial;
  color: initial;
}
#sidebar .sub-menu .nav-link { padding-left: 0.5em !important; }
#sidebar .sub-menu hr.dropdown-divider { width: 85% !important; margin-left: 0.15em !important; }
#sidebar .sub-menu li:first-child { margin-top: 0.5em !important; }
/* sub-menu chevrons */
#sidebar .dropdown > span::after {
  position: absolute;
  top: 12px;
  right: 14px;
  height: 14px;
  width: 14px;
  font-size: 12px;
  content: "\F282";
  font-family: "bootstrap-icons" !important;
  font-weight: bold;
  color: var(--bs-secondary);
  transform: rotate(0deg);
  transition: all 0.1s ease-out;
}
#sidebar .dropdown > span.collapsed::after {
  top: 15px;
  transform: rotate(90deg);
}
nav > ul > .nav-link > span > * { vertical-align: middle; }
/* sub-menu styling for smaller screens */
@media (max-width: 991px) {
  #sidebar nav > ul > .nav-link > span > i { font-size: 20px; }
  #sidebar nav > ul > .nav-link {
    border: none;
    font-size: 16px;
  }
  #sidebar nav > ul > .nav-link:hover {
    background: none;
    color: #0d4ba5;
  }
  #sidebar nav > ul > .nav-link.active {
    background: none;
    color: #0d4ba5;
    font-weight: bold;
  }
  #sidebar .sub-menu {
    position: absolute;
    top: 45px;
    right: 10px;
    font-size: 14px;
    background: rgb(240,240,240);
    border: 1px solid rgba(0,0,0,0.4);
    border-radius: 8px;
    white-space: nowrap;
    z-index: 999;
  }
  #sidebar .sub-menu::after {
    position: absolute;
    top: -8px;
    right: 10px;
    content: '';
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgb(240,240,240);
    z-index: 1000;
  }
  #sidebar .sub-menu::before {
    position: absolute;
    top: -10px;
    right: 8px;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgb(0,0,0,0.4);
    z-index: 999;
  }
  #sidebar .dropdown > span::after { content: none; }
}
</style>
