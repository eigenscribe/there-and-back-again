var ptx_lunr_search_style = "textbook";
var ptx_lunr_docs = [
{
  "id": "preface",
  "level": "1",
  "url": "preface.html",
  "type": "Preface",
  "number": "",
  "title": "Preface",
  "body": " Preface    The Eigenscribe Framework  first-principles reasoning    Eigenscribe Methodology   The :logo: Eigenscribe methodology :logo: is a structured approach to reasoning that aims to empower independent learning and research by emphasizing transparency and reporducibility. This is particularly important at the dawn of the AI era where the ability to sanity check is vital not onlyy the individual but for the fidelity of the scientific ecosystem as a whole.  At its core, the framework strives to enable responsible AI-assisted developing in a way that maximizes the benefits reaped from AI without sacrificing quality nor a human-supervised understanding of conclusions and systems derived. Rather than requiring that all ideas originate from fully reduced assumptions, the system allows exploratory and heuristic reasoning, which is progressively refined into formal, reproducible forms.     First-Principles Reasoning  first-principles  At the core of this system is the Eigenscribe methodology , which demands that all reasoning be grounded in explicit assumptions and traceable inference.   Eigenscribe Guidelines  The Eigenscribe methodology is a rigorous and rigorous framework for reasoning. To ensure clarity, rigor, and intellectual honesty, the following principles govern every entry:  Core Guidelines  Explicit Assumptions: Foundational assumptions must be justified by empirical observation, physical law, or formal axioms.  Traceable Inference Every inferential step must be transparent, allowing for independent sanity checks and reproduction by the reader.  Falsifiability All derived results and conclusions must remain open to revision. The system is designed for iterative correction, where conclusions can be refined once new evidence emerges.  Shared Primitives Connections between disparate domains (\"bridges\") are constructed from shared mathematical primitives, not mere analogy  Ember Warning: Any heuristics, analogies, etc. violating the above guidelines should be marked with a :ember:  Transparent AI Usage AI-generated content must be clearly marked as such.       The Architecture: Networked Mathematical Thinking  To support the first-principles guidelines, :logo: There and Back Again is divided into the functional layers. Each a distinct purpose in the research lifecycle:   Frontmatter  The \"constitution\" of the :logo: There and Back Again where strict conventions, notations, and methodology is established.  🪶 Scribing  The \"living\" layer containing field notes, historical context, and the narrative of discovery. This is where concept bridges are forged, linking fields like Geometric Algebra and Quantum Mechanics through shared primitives.  ⚽️ Practice Problems  A dedicated library of practice sets, designed to test understanding and reinforce application of theory.  🔱Meta  A collection of meta-information and cheatsheets for :logo: Eigenscribe © :logo: .  Backmatter  Foundational appendices, glossary and index terms, and a bibliography.     A Dynamic Document  This is a work in progress, designed to evolve alongside the researcher. As new insights are gained, the \"concept bridges\" are strengthened, the practice problems are expanded, and the appendices are refined. My hope is that this system serves as a model for how technical knowledge can be organized, retained, and applied with precision, ensuring that the lifeblood of science and engineering—reproducibility and clarity—remains intact.    :ember:  There and Back Again will be routinely updated over time.     "
},
{
  "id": "par-dynamic-document-3",
  "level": "2",
  "url": "preface.html#par-dynamic-document-3",
  "type": "Remark",
  "number": "0.0.0.2",
  "title": "",
  "body": "  :ember:  There and Back Again will be routinely updated over time.  "
},
{
  "id": "conventions",
  "level": "1",
  "url": "conventions.html",
  "type": "Preface",
  "number": "",
  "title": "Conventions",
  "body": " Conventions   Mathematical Notation  A reference for mathematical notation used throughout the notes.     vector space  vector  Vectors in the vector space  . These are grade-1 objects in Clifford algebra.     phase space  generalized coordinates  conjugate momenta  A point in phase space where represents the generalized coordinates and represents the conjugate momenta .  For this work, we will assume denotes the magnitude of the coordinate vector and denotes the magnitude of the momentum vector, respectively.     Poisson bracket  The Poisson bracket between two scalar functions and .     bivector  A bivector (grade-2) quantity.      Abbreviations    GA  geometric algebra  Geometric Algebra    psd  positive semi-definite  positive semi-definite    PSD  power spectral density  power spectral density    PIML  Physics-Informed Machine Learning    PINN  Physics-Informed Neural Networks      Icons    Proofmark  proofmark  :proofmark:  Use the Proofmark icon as a signature of authenticity or to mark verified, high-fidelity content that has undergone rigorous review.    Eigenote  eigenote  :eigenote:  Use an Eigenote icon to capture eigen-insights —the core, irreducible components of a concept or fundamental patterns that emerge across different domains.    Technical Observation  technical observation  :favicon:  Use a Technical Observation icon for specific implementation details, low-level technical notes, or cross-references.    Heuristic Warning  heuristic warning   Icon: :ember:  Use a Heuristic Warning icon to document rules of thumb, common pitfalls, and mental models that help navigate complex problem spaces.     "
},
{
  "id": "sub-icons-2-1-4",
  "level": "2",
  "url": "conventions.html#sub-icons-2-1-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Proofmark "
},
{
  "id": "sub-icons-2-2-4",
  "level": "2",
  "url": "conventions.html#sub-icons-2-2-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Eigenote "
},
{
  "id": "sub-icons-2-3-4",
  "level": "2",
  "url": "conventions.html#sub-icons-2-3-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Technical Observation "
},
{
  "id": "sub-icons-2-4-3",
  "level": "2",
  "url": "conventions.html#sub-icons-2-4-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Icon: "
},
{
  "id": "sub-icons-2-4-4",
  "level": "2",
  "url": "conventions.html#sub-icons-2-4-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Heuristic Warning "
},
{
  "id": "sec-hamiltonian-noether",
  "level": "1",
  "url": "sec-hamiltonian-noether.html",
  "type": "Section",
  "number": "1.1",
  "title": "Hamiltonian Noether’s Theorem",
  "body": " Hamiltonian Noether's Theorem  Hamiltonian mechanics  Noether's theorem    202605020001 | <Hamiltonian mechanics> , Noether's theorem     Conserved in time  conserved in time    A quantity is said to be conserved in time if    Two Interpretations:     is a constant along the flow of :      is invariant along the flow of (up to a minus sign). In other words, generates a symmetry of .        :logo: Take-Home Message         <🖇️ Linked Notes:>    <🔖 References:>  Physics with Elliot: The Most Beautiful Result in Classical Physics    "
},
{
  "id": "claim-conserved-in-time",
  "level": "2",
  "url": "sec-hamiltonian-noether.html#claim-conserved-in-time",
  "type": "Claim",
  "number": "1.1.1",
  "title": "",
  "body": "  A quantity is said to be conserved in time if    Two Interpretations:     is a constant along the flow of :      is invariant along the flow of (up to a minus sign). In other words, generates a symmetry of .      "
},
{
  "id": "sub-conserved-in-time-4-2",
  "level": "2",
  "url": "sec-hamiltonian-noether.html#sub-conserved-in-time-4-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "generates symmetry "
},
{
  "id": "sec-entropy-taximony",
  "level": "1",
  "url": "sec-entropy-taximony.html",
  "type": "Section",
  "number": "1.2",
  "title": "Entropy Taxonomy",
  "body": " Entropy Taxonomy  entropy  clausius entropy  boltzmann entropy  gibbs entropy  shannon entropy    Note ID:  202604110002 | Tags: thermodynamics , statistical mechanics , information theory   A taxonomy of entropy across various domains.    Entropy in Thermodynamics   Clausius Entropy   The Clausius entropy is a change in the entropy of a system due to some reversible process where it absorbs some amount of heat at a constant temperature :       Entropy in Statistical Mechanics   Boltzmann Entropy   The Boltzmann entropy of a macroscopic system in a state with multiplicity is given by:      Gibbs Entropy   The Gibbs entropy of a macroscopic system is defined in terms of the probabilities of being in microstate :       Entropy in Information Theory    The Shannon entropy of a discrete random variable with possible outcomes where and corresponding probabilities is defined as:       🖇️ Linked Notes:    🔖 References:  Lecture 6: Entropy    "
},
{
  "id": "sec-entropy-taximony-7-1",
  "level": "2",
  "url": "sec-entropy-taximony.html#sec-entropy-taximony-7-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Note ID: Tags: "
},
{
  "id": "def-clausius-entropy",
  "level": "2",
  "url": "sec-entropy-taximony.html#def-clausius-entropy",
  "type": "Definition",
  "number": "1.2.1",
  "title": "Clausius Entropy.",
  "body": " Clausius Entropy   The Clausius entropy is a change in the entropy of a system due to some reversible process where it absorbs some amount of heat at a constant temperature :    "
},
{
  "id": "def-boltzmann-entropy",
  "level": "2",
  "url": "sec-entropy-taximony.html#def-boltzmann-entropy",
  "type": "Definition",
  "number": "1.2.2",
  "title": "Boltzmann Entropy.",
  "body": " Boltzmann Entropy   The Boltzmann entropy of a macroscopic system in a state with multiplicity is given by:    "
},
{
  "id": "def-gibbs-entropy",
  "level": "2",
  "url": "sec-entropy-taximony.html#def-gibbs-entropy",
  "type": "Definition",
  "number": "1.2.3",
  "title": "Gibbs Entropy.",
  "body": " Gibbs Entropy   The Gibbs entropy of a macroscopic system is defined in terms of the probabilities of being in microstate :    "
},
{
  "id": "def-shannon-entropy",
  "level": "2",
  "url": "sec-entropy-taximony.html#def-shannon-entropy",
  "type": "Definition",
  "number": "1.2.4",
  "title": "",
  "body": "  The Shannon entropy of a discrete random variable with possible outcomes where and corresponding probabilities is defined as:    "
},
{
  "id": "sec-physics-and-geometric-algebra",
  "level": "1",
  "url": "sec-physics-and-geometric-algebra.html",
  "type": "Section",
  "number": "2.1",
  "title": "Geometric Algebra and Physics",
  "body": " Geometric Algebra and Physics   The :logo: Eigenscribe © methodology system utilizes Geometric Algebra (Clifford Algebra) as a unifying language to reformulate classical electromagnetism and quantum mechanics, replacing fragmented concepts from vector calculus with a coherent geometric framework.    Physical Interpretations of the Wedge Product    202604110004 | <geometric algebra>  <classical mechanics>  <vector calculus> | PreFigure Demo:  <🔗 >     Wedge Product and Angular Momentum   The wedge product captures oriented area and is analogous to angular momentum or flux in physical systems.    Angular momentum and oriented area (Placeholder)  [Diagram: Phase space area representation of angular momentum]        🔗 Linked Notes:     🔖 References:  Hamiltonian Mechanics with Geometric Calculus      Vector Potential for a Uniform Magnetic Field    Note Id:  202605310001 | Tags: geometric algebra  <electromagnetism>  <vector potential>     Vector Potential  vector potential   For a uniform magnetic field , represented as a bivector , the vector potential  must satisfy      Common Gauge Choices (Uniform Magnetic Field)    Symmetry Gauge  symmetry gauge  Preserves rotational symmetry.     Landau Gauge  landau gauge  Preserves translational symmetry along the -axis.       Vector Potential for a Uniform Magnetic Field  vector potential   Consider two gauges of a uniform magnetic field with respective potentials and . For such gauges, there is always some scalar function $\\chi$ that can be used to relate the respective vector potentials as follows:     🔗 Linked Notes:     "
},
{
  "id": "subsubsec-wedge-product-angular-momentum-2",
  "level": "2",
  "url": "sec-physics-and-geometric-algebra.html#subsubsec-wedge-product-angular-momentum-2",
  "type": "Claim",
  "number": "2.1.1",
  "title": "",
  "body": " The wedge product captures oriented area and is analogous to angular momentum or flux in physical systems.  "
},
{
  "id": "prefig-wedge-product-angular-momentum",
  "level": "2",
  "url": "sec-physics-and-geometric-algebra.html#prefig-wedge-product-angular-momentum",
  "type": "Figure",
  "number": "2.1.2",
  "title": "",
  "body": " Angular momentum and oriented area (Placeholder)  [Diagram: Phase space area representation of angular momentum]    "
},
{
  "id": "def-ga-uniform-b-field-vector-potential",
  "level": "2",
  "url": "sec-physics-and-geometric-algebra.html#def-ga-uniform-b-field-vector-potential",
  "type": "Definition",
  "number": "2.1.3",
  "title": "Vector Potential.",
  "body": " Vector Potential  vector potential   For a uniform magnetic field , represented as a bivector , the vector potential  must satisfy    "
},
{
  "id": "subsec-ga-uniform-b-field-4",
  "level": "2",
  "url": "sec-physics-and-geometric-algebra.html#subsec-ga-uniform-b-field-4",
  "type": "Example",
  "number": "2.1.4",
  "title": "Common Gauge Choices (Uniform Magnetic Field).",
  "body": " Common Gauge Choices (Uniform Magnetic Field)    Symmetry Gauge  symmetry gauge  Preserves rotational symmetry.     Landau Gauge  landau gauge  Preserves translational symmetry along the -axis.     "
},
{
  "id": "subsec-ga-uniform-b-field-5",
  "level": "2",
  "url": "sec-physics-and-geometric-algebra.html#subsec-ga-uniform-b-field-5",
  "type": "Lemma",
  "number": "2.1.5",
  "title": "Vector Potential for a Uniform Magnetic Field.",
  "body": " Vector Potential for a Uniform Magnetic Field  vector potential   Consider two gauges of a uniform magnetic field with respective potentials and . For such gauges, there is always some scalar function $\\chi$ that can be used to relate the respective vector potentials as follows:    "
},
{
  "id": "sec-feynmann-lectures",
  "level": "1",
  "url": "sec-feynmann-lectures.html",
  "type": "Section",
  "number": "3.1",
  "title": "Feynman Lectures",
  "body": " Feynman Lectures   The vector potential provides a mathematical framework for electromagnetism that can be generalized to hydrodynamics, which is inherently time dependent. This conceptual transition is discussed in The Feynman Lectures on Physics , Vol. II, Ch. 15, “The Vector Potential.”      Static Electromagnetic Variables (Non-Generalizable)    Concept  Mathematical Form    Electric field is curl-free       Electrostatic potential       Static charge distribution         Generalized Dynamic Variables (Hydrodynamic \/ Electrodynamic)    Concept  Mathematical Form    Velocity or vector potential field       Non-zero circulation \/ vorticity       Time-dependent evolution          Adapted from Table 15-1 in from The Feynman Lectures on Physics , Vol. II, Ch. 15, “The Vector Potential,” Section 15-5.  "
},
{
  "id": "claim-vector-potential-generalization",
  "level": "2",
  "url": "sec-feynmann-lectures.html#claim-vector-potential-generalization",
  "type": "Claim",
  "number": "3.1.1",
  "title": "",
  "body": " The vector potential provides a mathematical framework for electromagnetism that can be generalized to hydrodynamics, which is inherently time dependent. This conceptual transition is discussed in The Feynman Lectures on Physics , Vol. II, Ch. 15, “The Vector Potential.”  "
},
{
  "id": "table-static-electromagnetic-variables",
  "level": "2",
  "url": "sec-feynmann-lectures.html#table-static-electromagnetic-variables",
  "type": "Table",
  "number": "3.1.2",
  "title": "Static Electromagnetic Variables (Non-Generalizable)",
  "body": " Static Electromagnetic Variables (Non-Generalizable)    Concept  Mathematical Form    Electric field is curl-free       Electrostatic potential       Static charge distribution       "
},
{
  "id": "table-generalized-dynamic-electromagnetic-variables",
  "level": "2",
  "url": "sec-feynmann-lectures.html#table-generalized-dynamic-electromagnetic-variables",
  "type": "Table",
  "number": "3.1.3",
  "title": "Generalized Dynamic Variables (Hydrodynamic \/ Electrodynamic)",
  "body": " Generalized Dynamic Variables (Hydrodynamic \/ Electrodynamic)    Concept  Mathematical Form    Velocity or vector potential field       Non-zero circulation \/ vorticity       Time-dependent evolution       "
},
{
  "id": "sec-pre-quantum",
  "level": "1",
  "url": "sec-pre-quantum.html",
  "type": "Section",
  "number": "4.1",
  "title": "Pre-Quantum",
  "body": " Pre-Quantum   Joseph-Louis Lagrange  The Lagrangian  the action    Years: 1736-1813   Citizenship: Italian-French   The Hook: Reformulated Newton's laws into a scalar optimization problem, now known as the Principle of Least Action.   Core Contribution: Introduced the Lagrangian function and defined the action .    "
},
{
  "id": "sub-lagrange-joseph-louis-4-4",
  "level": "2",
  "url": "sec-pre-quantum.html#sub-lagrange-joseph-louis-4-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Lagrangian function action "
},
{
  "id": "sec-post-quantum",
  "level": "1",
  "url": "sec-post-quantum.html",
  "type": "Section",
  "number": "4.2",
  "title": "Post-Quantum",
  "body": " Post-Quantum    "
},
{
  "id": "sec-qc-practice-set-1",
  "level": "1",
  "url": "sec-qc-practice-set-1.html",
  "type": "Section",
  "number": "5.1",
  "title": "Introduction to Quantum Computing with Qiskit",
  "body": " Introduction to Quantum Computing with Qiskit    202604120001 | <tensor products> , Qiskit , state vectors     Quantum Computing - Problem Set 1   Imports   from qiskit.quantum_info import Statevector, Operator import numpy as np from numpy import sqrt from IPython.display import display, Latex, Math from qiskit import __version__ print(f\"Qiskit version: {__version__}\")     Tensor Products    Use Qiskit to compute the tensor product . Your solution must construct the state and print out the amplitudes in the computational basis.    Use    Statevector.from_label(\"-\") for    Statevector.from_label(\"r\") for       # Declare state vectors minus = Statevector.from_label(\"-\") plus_i = Statevector.from_label(\"r\") # Compute the tensor product and display the result display(minus.tensor(plus_i).draw(\"latex\"))          Given the state write the state vector ordering explicitly.    🎗️ Qiskit starts its indexing (qubit 0) from the right-hand side.     zero = Statevector([1, 0]) one = Statevector([0, 1]) plus = Statevector.from_label(\"+\") display((zero ^ one ^ plus).draw(\"latex\"))          "
},
{
  "id": "eg-tensor-products-2",
  "level": "2",
  "url": "sec-qc-practice-set-1.html#eg-tensor-products-2",
  "type": "Exercise",
  "number": "5.1.1",
  "title": "",
  "body": "  Use Qiskit to compute the tensor product . Your solution must construct the state and print out the amplitudes in the computational basis.    Use    Statevector.from_label(\"-\") for    Statevector.from_label(\"r\") for       # Declare state vectors minus = Statevector.from_label(\"-\") plus_i = Statevector.from_label(\"r\") # Compute the tensor product and display the result display(minus.tensor(plus_i).draw(\"latex\"))       "
},
{
  "id": "eg-tensor-products-3",
  "level": "2",
  "url": "sec-qc-practice-set-1.html#eg-tensor-products-3",
  "type": "Exercise",
  "number": "5.1.2",
  "title": "",
  "body": "  Given the state write the state vector ordering explicitly.    🎗️ Qiskit starts its indexing (qubit 0) from the right-hand side.     zero = Statevector([1, 0]) one = Statevector([0, 1]) plus = Statevector.from_label(\"+\") display((zero ^ one ^ plus).draw(\"latex\"))       "
},
{
  "id": "ch-sofias-practice-problems",
  "level": "1",
  "url": "ch-sofias-practice-problems.html",
  "type": "Chapter",
  "number": "6",
  "title": "My Practice Problems",
  "body": " My Practice Problems   Practice Set 4 - Hamiltonian Flow vs. Vector Flow vs. Vector Potentials   Geometric Algebra Foundations and Definitions   Vector Potential & Gauge Transformations in Geometric Algebra    Setup: Consider a uniform magnetic field . In Geometric Algebra (GA), we represent this as the bivector: Note that in 3D, the traditional vector is the dual of this bivector via , where .     Find the vector potential such that . Specifically, verify that the following two gauges satisfy this condition:   Symmetry Gauge:   Landau Gauge:     Expand using the definition . Show that only the -component is non-zero and equals .     Define a gauge transformation as . What is the physical significance of the scalar function ?      Determine the specific scalar function that transforms the Landau gauge potential into the Symmetry gauge potential:    Calculate the difference and integrate component-wise.     Prove that the magnetic bivector is invariant under this transformation:       Why does adding the gradient term not change the bivector field ? Explain this in terms of the properties of the wedge product and second derivatives.       "
},
{
  "id": "ex-ga-vector-potential-full",
  "level": "2",
  "url": "exercises-sofias-practice-set-4.html#ex-ga-vector-potential-full",
  "type": "Exercise",
  "number": "6.1",
  "title": "Vector Potential &amp; Gauge Transformations in Geometric Algebra.",
  "body": " Vector Potential & Gauge Transformations in Geometric Algebra    Setup: Consider a uniform magnetic field . In Geometric Algebra (GA), we represent this as the bivector: Note that in 3D, the traditional vector is the dual of this bivector via , where .     Find the vector potential such that . Specifically, verify that the following two gauges satisfy this condition:   Symmetry Gauge:   Landau Gauge:     Expand using the definition . Show that only the -component is non-zero and equals .     Define a gauge transformation as . What is the physical significance of the scalar function ?      Determine the specific scalar function that transforms the Landau gauge potential into the Symmetry gauge potential:    Calculate the difference and integrate component-wise.     Prove that the magnetic bivector is invariant under this transformation:       Why does adding the gradient term not change the bivector field ? Explain this in terms of the properties of the wedge product and second derivatives.    "
},
{
  "id": "sec-template",
  "level": "1",
  "url": "sec-template.html",
  "type": "Section",
  "number": "7.1",
  "title": "PreTeXt Element Demo",
  "body": " PreTeXt Element Demo   This section serves as a demonstration of various PreTeXt elements styled with the current theme. It uses placeholder text to showcase the layout and formatting of common components.    Textual Elements  Lorem ipsum dolor sit amet, consectetur adipiscing elit. :eigenote: Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor.  Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia ac. :favicon: Curabitur wisi vitae nisl auctor interdum.   Lists and Descriptions  Below is an unordered list of common features:    Feature one: Lorem ipsum dolor sit amet.    Feature two: Consectetur adipiscing elit.    Feature three: Sed do eiusmod tempor incididunt.    And an ordered list for sequential steps:    First, analyze the requirements.    Second, design the architecture.    Third, implement the solution.    Finally, a description list for terminology:    PreTeXt  An authoring system for scholarly documents.    CSS  Cascading Style Sheets for visual presentation.       Admonitions and Blocks  Admonitions are used to highlight important information.   Note with Icon  :eigenote: This is a note that uses the Eigenote icon. It captures core insights that are fundamental to understanding the topic.    Heuristic Warning  :ember: Be careful when applying these rules of thumb. Context matters, and pitfalls may emerge in complex environments.    Deep Insight  The pattern observed here is recursive. Understanding the base case is essential for grasping the entire structure.    A Simple Example   Consider the function . What is its derivative?    The derivative is .     Summary Checklist   Verify all icons are rendered.  Check responsive layout.  Ensure color contrast is sufficient.      Technical Elements  Technical documentation often requires code snippets and mathematical formulas.   Code Blocks  Here is a sample Python script:   def hello_world(): print(\"Hello, PreTeXt!\") if __name__ == \"__main__\": hello_world()   :favicon: Note the glassmorphic styling applied to the code block.    Mathematics  Inline math like and display math:       Tables   Sample Data    Category  Value    Alpha  100    Beta  200       PreFigure Demo    Note ID:  202606020002 | Tags: prefigure , interactive , diagrams    PreFigure allows for the creation of interactive, accessible, and beautiful mathematical diagrams directly within PreTeXt.  Below is a placeholder for an interactive diagram. In a live environment, this would render a dynamic SVG.   Interactive PreFigure Demonstration   [Interactive PreFigure Diagram Placeholder]     "
},
{
  "id": "sec-admonitions-3",
  "level": "2",
  "url": "sec-template.html#sec-admonitions-3",
  "type": "Note",
  "number": "7.1.1",
  "title": "Note with Icon.",
  "body": " Note with Icon  :eigenote: This is a note that uses the Eigenote icon. It captures core insights that are fundamental to understanding the topic.  "
},
{
  "id": "sec-admonitions-4",
  "level": "2",
  "url": "sec-template.html#sec-admonitions-4",
  "type": "Warning",
  "number": "7.1.2",
  "title": "Heuristic Warning.",
  "body": " Heuristic Warning  :ember: Be careful when applying these rules of thumb. Context matters, and pitfalls may emerge in complex environments.  "
},
{
  "id": "sec-admonitions-5",
  "level": "2",
  "url": "sec-template.html#sec-admonitions-5",
  "type": "Insight",
  "number": "7.1.3",
  "title": "Deep Insight.",
  "body": " Deep Insight  The pattern observed here is recursive. Understanding the base case is essential for grasping the entire structure.  "
},
{
  "id": "ex-lorem",
  "level": "2",
  "url": "sec-template.html#ex-lorem",
  "type": "Example",
  "number": "7.1.4",
  "title": "A Simple Example.",
  "body": " A Simple Example   Consider the function . What is its derivative?    The derivative is .   "
},
{
  "id": "subsec-tables-2",
  "level": "2",
  "url": "sec-template.html#subsec-tables-2",
  "type": "Table",
  "number": "7.1.5",
  "title": "Sample Data",
  "body": " Sample Data    Category  Value    Alpha  100    Beta  200    "
},
{
  "id": "subsec-prefigure-demo-2-1",
  "level": "2",
  "url": "sec-template.html#subsec-prefigure-demo-2-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Note ID: Tags: "
},
{
  "id": "fig-prefigure-demo-placeholder",
  "level": "2",
  "url": "sec-template.html#fig-prefigure-demo-placeholder",
  "type": "Figure",
  "number": "7.1.6",
  "title": "",
  "body": " Interactive PreFigure Demonstration   [Interactive PreFigure Diagram Placeholder]  "
},
{
  "id": "sec-pretext-cheat-sheet",
  "level": "1",
  "url": "sec-pretext-cheat-sheet.html",
  "type": "Section",
  "number": "7.2",
  "title": "PreTeXt Cheat Sheet",
  "body": " PreTeXt Cheat Sheet    202606012315 | <pretext>  <xml>  <authoring>   A comprehensive guide to PreTeXt XML elements and structure for authoring mathematical content.    Document Structure  PreTeXt documents follow a strict hierarchical organization.   <pretext> <docinfo> ... <\/docinfo> <book xml:id=\"my-book\"> <title>Book Title<\/title> <chapter xml:id=\"ch-demo\"> <title>Chapter<\/title> <section xml:id=\"sec-demo\"> <title>Section Title<\/title> <introduction> <p> <tag>202606012315<\/tag> | <tag>topic<\/tag> <\/p> <\/introduction> <subsection xml:id=\"sub-demo\"> <title>Subsection<\/title> <p>Content with <m>E=mc^2<\/m> and <xref ref=\"ch-demo\"\/>.<\/p> <\/subsection> <conclusion> <p>🖇️ <alert>Linked Notes:<\/alert> <xref ref=\"other-note\"\/><\/p> <\/conclusion> <\/section> <\/chapter> <\/book> <\/pretext>     Inline Elements and Tags  Inline elements are used within paragraphs ( <p> ) to style text or add semantics.   Common Inline Elements    Element  Usage  Example    <m>  Inline Math (LaTeX)     <tag>  Semantic Tags (Metadata)  <quantum mechanics>    <c>  Inline Code\/Verbatim  git status    <em>  Emphasis (Cooler Blue\/Italic)  Nuance    <term>  Defining a term (Orange Gradient)  Bivector    <strong>  Strong emphasis (Prominent Cyan)  Key Term    <alert>  Metadata labels (Glassmorphic Pill)  Warning!    <em class=\"alert\">  Critical Emphasis (Blue Gradient)  Important!    <xref>  Cross-reference  See    <url>  Hyperlink  PreTeXt      Note: In this project, <tag> elements are styled as glassmorphic pills.    Mathematics  PreTeXt supports various math environments using standard LaTeX notation.    Inline Math  Use <m>...<\/m> for inline expressions.    Single Line Equations  Use <md> for equations. Single-line equations no longer use <me> or <men> (deprecated). Use @number=\"yes\" on <md> for numbering.   <md number=\"yes\"> <mrow xml:id=\"eq-schrodinger\">i\\hbar\\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi<\/mrow> <\/md>    Output:      Aligned Equations  Use <md> with <mrow> for multiple lines. Use \\amp for alignment.   <md> <mrow> \\nabla \\cdot \\mathbf{E} \\amp = \\frac{\\rho}{\\epsilon_0} <\/mrow> <mrow> \\nabla \\cdot \\mathbf{B} \\amp = 0 <\/mrow> <\/md>    Output:        Common Blocks  Structural blocks organize content into logical units with specific styling.   <definition xml:id=\"def-unitary\"> <title>Unitary Operator<\/title> <statement> <p>An operator <m>U<\/m> is unitary if <m>U^\\dagger U = I<\/m>.<\/p> <\/statement> <\/definition>    Output:    Unitary Operator   An operator is unitary if .     <theorem xml:id=\"thm-noether\"> <title>Noether's Theorem<\/title> <statement> <p>Every differentiable symmetry ... has a corresponding conservation law.<\/p> <\/statement> <\/theorem>    Output:    Noether's Theorem   Every differentiable symmetry ... has a corresponding conservation law.     <assemblage> <title>Key Concept<\/title> <p>Assemblages are used for boxed summaries (Glassmorphic in this theme).<\/p> <\/assemblage>    Output:    Key Concept  Assemblages are used for boxed summaries (Glassmorphic in this theme).     Comprehensive Element Table   PreTeXt Element Categories    Category  Elements  Description    Structure  book , part , chapter , section  High-level document organization    Blocks  definition , theorem , example  Semantic mathematical environments    Admonitions  note , warning , insight , remark  Side-bars or callout boxes    Technical  program , image , table , figure  Non-textual data, code, and graphics    Lists  ul , ol , dl  Unordered, ordered, and description lists    Backmatter  idx , biblio , glossary , colophon  Indices, references, and metadata       Project Conventions  Custom styles and standards used in this Zettelkasten.     Note Metadata: Every note should include a metadata block (Note ID, Tags, etc.). This block can be placed in <introduction> , blockquote , aside , or <paragraphs> .   <!-- Traditional Introduction --> <introduction> <p> <tag>202606012315<\/tag> | <tag>topic1<\/tag> <tag>topic2<\/tag> <\/p> <\/introduction> <!-- Alternative using Blockquote (Always visible, no title) --> <blockquote> <p> <tag>202606012315<\/tag> | <tag>topic1<\/tag> <\/p> <\/blockquote>    Output (approximate):     202606012315 | <topic1> , topic2 | PreFigure Demo: <🔗 Interactive>       Note IDs: Use YYYYMMDDNNNN or HHMM format. The first <tag> in a supported metadata block (Introduction, Blockquote, etc.) is automatically styled as a purple glassmorphic Note ID.     Conclusion Metadata: Conclusions use <alert> tags for metadata labels (e.g., Linked Notes, References), which are automatically styled as blue glassmorphic pills.   <conclusion> <p> 🖇️ <alert>Linked Notes:<\/alert> <xref ref=\"sec-topic\" \/> <\/p> <p> 🔖 <alert>References:<\/alert> <xref ref=\"biblio-item\" \/> <\/p> <\/conclusion>      List Titles: Headings inside list items (e.g. <li><title>...<\/title><\/li> or <li class=\"li\"><title>...<\/title><\/li> ) are styled in prominent cyan with the heading font.     Assemblages: Use for primary takeaways or \"atomic\" notes within a section.     "
},
{
  "id": "sub-pretext-inline-3",
  "level": "2",
  "url": "sec-pretext-cheat-sheet.html#sub-pretext-inline-3",
  "type": "Table",
  "number": "7.2.1",
  "title": "Common Inline Elements",
  "body": " Common Inline Elements    Element  Usage  Example    <m>  Inline Math (LaTeX)     <tag>  Semantic Tags (Metadata)  <quantum mechanics>    <c>  Inline Code\/Verbatim  git status    <em>  Emphasis (Cooler Blue\/Italic)  Nuance    <term>  Defining a term (Orange Gradient)  Bivector    <strong>  Strong emphasis (Prominent Cyan)  Key Term    <alert>  Metadata labels (Glassmorphic Pill)  Warning!    <em class=\"alert\">  Critical Emphasis (Blue Gradient)  Important!    <xref>  Cross-reference  See    <url>  Hyperlink  PreTeXt    "
},
{
  "id": "def-unitary-example",
  "level": "2",
  "url": "sec-pretext-cheat-sheet.html#def-unitary-example",
  "type": "Definition",
  "number": "7.2.2",
  "title": "Unitary Operator.",
  "body": " Unitary Operator   An operator is unitary if .   "
},
{
  "id": "thm-noether-example",
  "level": "2",
  "url": "sec-pretext-cheat-sheet.html#thm-noether-example",
  "type": "Theorem",
  "number": "7.2.3",
  "title": "Noether’s Theorem.",
  "body": " Noether's Theorem   Every differentiable symmetry ... has a corresponding conservation law.   "
},
{
  "id": "sub-pretext-elements-table-2",
  "level": "2",
  "url": "sec-pretext-cheat-sheet.html#sub-pretext-elements-table-2",
  "type": "Table",
  "number": "7.2.4",
  "title": "PreTeXt Element Categories",
  "body": " PreTeXt Element Categories    Category  Elements  Description    Structure  book , part , chapter , section  High-level document organization    Blocks  definition , theorem , example  Semantic mathematical environments    Admonitions  note , warning , insight , remark  Side-bars or callout boxes    Technical  program , image , table , figure  Non-textual data, code, and graphics    Lists  ul , ol , dl  Unordered, ordered, and description lists    Backmatter  idx , biblio , glossary , colophon  Indices, references, and metadata    "
},
{
  "id": "sec-git",
  "level": "1",
  "url": "sec-git.html",
  "type": "Section",
  "number": "8.1",
  "title": "Terminal Cheat Sheet",
  "body": " Terminal Cheat Sheet    Note ID:  202604120002 | Tags: git  <bash>  <terminal>     Local Git Reset  Multiline version (safter, less likely to accidentally earase local changes):   git fetch origin git checkout main # or whatever branch you're using git reset --hard origin\/main git clean -fd # removes untracked files & folders   One-liner (⚠️ use with caution!):   git fetch origin && git reset --hard origin\/main && git clean -fd     Update pip requirements.txt   pip install -r requirements.txt --upgrade pip freeze > requirements.txt    "
},
{
  "id": "sec-git-2-1",
  "level": "2",
  "url": "sec-git.html#sec-git-2-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Note ID: Tags: "
},
{
  "id": "sec-python-gold-standards",
  "level": "1",
  "url": "sec-python-gold-standards.html",
  "type": "Section",
  "number": "9.1",
  "title": "Python Gold Standards",
  "body": " Python Gold Standards  python    Note ID:  202605080001 | Tags: python     Python Rule of Thumb   The primary goal is to routinely write scripts that read like math and code.  If someone scrolls your script top-to-bottom, the conceptual story should flow:  What exists?  What are you allowed to call?  How does it work?  Proof it works.       Gold Standard Python Template   # src\/example.py \"\"\" Script descriptiion Author: Date: \"\"\" # imports and typing __future__ import annotations # Type hinting __all__ = [\"public_function\"] # Explicitly declare public API # ----------------------------------------------------------------------------------------------------------- # 0️⃣ Typing helpers \/ protocols \/ constants (if needed) # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 1️⃣ Core definitions # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 2️⃣ Public API (functions users are meant to call) # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 3️⃣ Private helpers # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 4️⃣ Smoke tests \/ example usage # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 5️⃣ Entry point # -----------------------------------------------------------------------------------------------------------     Fundamental Features   Numbered Emoji Sectioning    Helps to make long scripts scannable.  Meant to be used as semantic anchor points, not decoration.      if name == \"__main__\"    Placed at the bottom of the script.   ✔️ Only use for:  Running smoke tests.  Minimal demonstrations.  Sanity checks.      ❌ Never use for:  Running large-scale experiments.  Running training loops.  Running inference pipelines.         def main() -> None:    Always exists.  Orchestrates calls to public API for smoke tests, demos, sanity checks.  Never contains math or logic explicitly.     def main() -> None: _smoke_test()     \"Big functions\" to bundle logic.  Use large functions to bundle related logic together.    Type Annotations Everywhere (within reason)  🔑 Key Habits to Remember:  Use Tensor , not torch.Tensor , in type annotations.  Annotate scalars ( float | Tensor ) when physically meaningul.   Use Final for constants:   omega: float | Final[Tensor] = 1.0        NumPy-Style Docstrings  These should always be present on:  public functions.  public classes.  nontrivial private helpers.       Minimal viable structure:   def public_function(x: Tensor) -> Tensor: \"\"\" Short description. Parameters ---------- x : Tensor Description of x. Returns ------- Tensor Description of return value. \"\"\" pass        "
},
{
  "id": "sec-python-gold-standards-3-1",
  "level": "2",
  "url": "sec-python-gold-standards.html#sec-python-gold-standards-3-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Note ID: Tags: "
},
{
  "id": "subsec-key-features-3",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-3",
  "type": "Note",
  "number": "9.1.1",
  "title": "<code class=\"code-inline tex2jax_ignore\">if name == \"__main__\"<\/code>.",
  "body": " if name == \"__main__\"    Placed at the bottom of the script.   ✔️ Only use for:  Running smoke tests.  Minimal demonstrations.  Sanity checks.      ❌ Never use for:  Running large-scale experiments.  Running training loops.  Running inference pipelines.       "
},
{
  "id": "subsec-key-features-4",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-4",
  "type": "Note",
  "number": "9.1.2",
  "title": "<code class=\"code-inline tex2jax_ignore\">def main() -&gt; None:<\/code>.",
  "body": " def main() -> None:    Always exists.  Orchestrates calls to public API for smoke tests, demos, sanity checks.  Never contains math or logic explicitly.     def main() -> None: _smoke_test()   "
},
{
  "id": "subsec-key-features-5",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-5",
  "type": "Note",
  "number": "9.1.3",
  "title": "\"Big functions\" to bundle logic..",
  "body": " \"Big functions\" to bundle logic.  Use large functions to bundle related logic together.  "
},
{
  "id": "subsec-key-features-6",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-6",
  "type": "Note",
  "number": "9.1.4",
  "title": "Type Annotations Everywhere (within reason).",
  "body": " Type Annotations Everywhere (within reason)  🔑 Key Habits to Remember:  Use Tensor , not torch.Tensor , in type annotations.  Annotate scalars ( float | Tensor ) when physically meaningul.   Use Final for constants:   omega: float | Final[Tensor] = 1.0      "
},
{
  "id": "subsec-key-features-7",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-7",
  "type": "Note",
  "number": "9.1.5",
  "title": "NumPy-Style Docstrings.",
  "body": " NumPy-Style Docstrings  These should always be present on:  public functions.  public classes.  nontrivial private helpers.       Minimal viable structure:   def public_function(x: Tensor) -> Tensor: \"\"\" Short description. Parameters ---------- x : Tensor Description of x. Returns ------- Tensor Description of return value. \"\"\" pass      "
},
{
  "id": "sec-formal-statements",
  "level": "1",
  "url": "sec-formal-statements.html",
  "type": "Section",
  "number": "10.1",
  "title": "Formal Statements",
  "body": " Formal Statements   Types of Formal Statements           Term    Requires Proof?    Empirical?    Context    Role       Definition   ❌  ❌  Mathematics \/ Logic  Introduces precise meaning of a term      Axiom \/ Postulate   ❌  Sometimes  Foundations  Undemonstrated starting assumption      Theorem   ✅  ❌  Mathematics  Major derived result requiring rigorous proof      Lemma   ✅  ❌  Foundations  Intermediate helper theorem used to prove larger results      Corollary   Derived Directly  ❌  Research  Necessary consequence following immediately from a theorem      Proposition   ✅  ❌  Research  Mid-level proven result of moderate significance      Conjecture   Unproven  Sometimes  Research  Tentative proposition believed true based on patterns\/intuition, awaiting proof      Hypothesis   Testable (Not Proven)  ✅  Science \/ Physics  Definition      Claim   Unverified  Sometimes  General Research  Asserted statement requiring evidence or argument to be accepted      Principle   ❌  Sometimes  Physics \/ Math  Fundamental rule guiding theory construction (often heuristic)      Law   ❌ (Mathematically Derived)  ✅  Science  Descriptive generalization of empirical regularities      Model   Validated  ✅  Science  Representational system designed to explain\/predict phenomena     "
},
{
  "id": "table-formal-statement-types",
  "level": "2",
  "url": "sec-formal-statements.html#table-formal-statement-types",
  "type": "Table",
  "number": "10.1.1",
  "title": "Types of Formal Statements",
  "body": " Types of Formal Statements           Term    Requires Proof?    Empirical?    Context    Role       Definition   ❌  ❌  Mathematics \/ Logic  Introduces precise meaning of a term      Axiom \/ Postulate   ❌  Sometimes  Foundations  Undemonstrated starting assumption      Theorem   ✅  ❌  Mathematics  Major derived result requiring rigorous proof      Lemma   ✅  ❌  Foundations  Intermediate helper theorem used to prove larger results      Corollary   Derived Directly  ❌  Research  Necessary consequence following immediately from a theorem      Proposition   ✅  ❌  Research  Mid-level proven result of moderate significance      Conjecture   Unproven  Sometimes  Research  Tentative proposition believed true based on patterns\/intuition, awaiting proof      Hypothesis   Testable (Not Proven)  ✅  Science \/ Physics  Definition      Claim   Unverified  Sometimes  General Research  Asserted statement requiring evidence or argument to be accepted      Principle   ❌  Sometimes  Physics \/ Math  Fundamental rule guiding theory construction (often heuristic)      Law   ❌ (Mathematically Derived)  ✅  Science  Descriptive generalization of empirical regularities      Model   Validated  ✅  Science  Representational system designed to explain\/predict phenomena    "
},
{
  "id": "sec-reasoning-taxonomy",
  "level": "1",
  "url": "sec-reasoning-taxonomy.html",
  "type": "Section",
  "number": "10.2",
  "title": "Reasoning Taxonomy",
  "body": " Reasoning Taxonomy   Understanding these reasoning patterns allows us to diagnose our own cognitive processes when building Eigenotes. We employ deductive reasoning to derive consequences from axioms, abductive reasoning to generate hypotheses from anomalous data, and spatial reasoning to visualize geometric structures.     Deductive Reasoning  deductive reasoning  Drawing specific conclusions from general laws or principles.  Example:  Given this mechanism, what must follow?    Inductive Reasoning  inductive reasoning  Generalizing from patterns or experimental observations.  Example:  Given this data, what can we infer about X?    Temporal Reasoning  temporal reasoning  Predicting events or states based on order in time.  Example:  If A happens before B, and B affects C, what is the downstream effect?    Spatial Reasoning  spatial reasoning  Understanding structures, orientation, or symmetry.  Example:  What is the normal force on an object sliding down a ramp inclined at angle X?    Causal Reasoning  causal reasoning  Identifying cause-and-effect relationships.  Example:  What arrangement of three electrons causes zero electric field at the center-of-mass location?    Comparative Analysis  comparative analysis  Judging between alternatives or evaluating differences across conditions.  Example:  What is the percent difference in the ground-state energy of an atom trapped in a harmonic potential versus a quartic potential?    Abstract Reasoning  abstract reasoning  Working with non-concrete or theoretical ideas.  Example:  What is the entropy change in a hypothetical closed system with constraint X?    Pattern Recognition  pattern recognition  Spotting and interpreting regularities in data or sequences.  Example:  The amounts of a radioactive isotope at times , , and are , , and . What is the half-life?    Statistical Reasoning  statistical reasoning  Using data, probabilities, and distributions to reach conclusions.  Example:  Determine the uncertainty in the extracted value of X given the experimental data.    Abductive Reasoning  abductive reasoning  Inferring the most likely explanation from incomplete evidence.  Example:  As the temperature changes from to , the spatial correlation length increases exponentially. What is likely true about the material's location in phase space?    Hypothetical Reasoning  hypothetical reasoning  Predicting outcomes under hypothetical or counterfactual scenarios.  Example:  What would be the fractional change in Earth's gravitational field if the gravitational constant were doubled?    "
},
{
  "id": "sec-computational-methods",
  "level": "1",
  "url": "sec-computational-methods.html",
  "type": "Section",
  "number": "A.1",
  "title": "Computational Methods",
  "body": " Computational Methods  computational methods      Numerical Methods  numerical methods methods   Numerical methods hurt my head. 🤯    Comparison of Finite Difference Scheme Properties  forward difference  backward difference  central difference  The following tables summarize common finite difference schemes for first and second derivatives.   First-Derivative Finite Difference Schemes       Scheme and Formulation  Error  Grid Points      Forward Difference                 Backward Difference                 Central Difference    Second-order accurate central difference scheme:               Second-Derivative Finite Difference Schemes       Scheme and Formulation  Error  Grid Points      Central Difference                  "
},
{
  "id": "tab-first-derivative-finite-difference",
  "level": "2",
  "url": "sec-computational-methods.html#tab-first-derivative-finite-difference",
  "type": "Table",
  "number": "A.1.1",
  "title": "First-Derivative Finite Difference Schemes",
  "body": " First-Derivative Finite Difference Schemes       Scheme and Formulation  Error  Grid Points      Forward Difference                 Backward Difference                 Central Difference    Second-order accurate central difference scheme:             "
},
{
  "id": "tab-second-derivative-finite-difference",
  "level": "2",
  "url": "sec-computational-methods.html#tab-second-derivative-finite-difference",
  "type": "Table",
  "number": "A.1.2",
  "title": "Second-Derivative Finite Difference Schemes",
  "body": " Second-Derivative Finite Difference Schemes       Scheme and Formulation  Error  Grid Points      Central Difference               "
},
{
  "id": "sec-ga-hodge-dual",
  "level": "1",
  "url": "sec-ga-hodge-dual.html",
  "type": "Section",
  "number": "B.1",
  "title": "Hodge Dual",
  "body": " Hodge Dual  Hodge Dual   The Cross Product as a Dual Wedge Product  In Clifford algebra (Euclidean 3-D space), the standard vector cross product $\\vec{a}\\times\\vec{b}$ is equivalent to the dual of the geometric wedge product $\\vec{a}\\wedge\\vec{b}$ as follows: where is the unit pseudoscalar in .   Note that .  "
},
{
  "id": "ga-hodge-dual-3D",
  "level": "2",
  "url": "sec-ga-hodge-dual.html#ga-hodge-dual-3D",
  "type": "Identity",
  "number": "B.1.1",
  "title": "The Cross Product as a Dual Wedge Product.",
  "body": " The Cross Product as a Dual Wedge Product  In Clifford algebra (Euclidean 3-D space), the standard vector cross product $\\vec{a}\\times\\vec{b}$ is equivalent to the dual of the geometric wedge product $\\vec{a}\\wedge\\vec{b}$ as follows: where is the unit pseudoscalar in .  "
},
{
  "id": "sec-ga-hodge-dual-4",
  "level": "2",
  "url": "sec-ga-hodge-dual.html#sec-ga-hodge-dual-4",
  "type": "Note",
  "number": "B.1.2",
  "title": "",
  "body": "Note that . "
},
{
  "id": "sec-methodological-frameworks",
  "level": "1",
  "url": "sec-methodological-frameworks.html",
  "type": "Section",
  "number": "C.1",
  "title": "Research Methods",
  "body": " Research Methods   Hypotheses     Hypothesis   A hypothesis is a falsifiable prediction formulated for experimental verification     Summary of Type I vs. Type II Errors   is adapted from Harrington, 2011.     type I error  type II error       Decision  is True  is False     Decide to reject      Type I error     ✔️      Decide to accept     ✔️     Type II error        "
},
{
  "id": "def-hypothesis",
  "level": "2",
  "url": "sec-methodological-frameworks.html#def-hypothesis",
  "type": "Definition",
  "number": "C.1.1",
  "title": "Hypothesis.",
  "body": " Hypothesis   A hypothesis is a falsifiable prediction formulated for experimental verification   "
},
{
  "id": "tab-hypothesis-errors",
  "level": "2",
  "url": "sec-methodological-frameworks.html#tab-hypothesis-errors",
  "type": "Table",
  "number": "C.1.2",
  "title": "Summary of Type I vs. Type II Errors <details class=\"ptx-footnote\" aria-live=\"polite\" id=\"tab-hypothesis-errors-1-1\"><summary class=\"ptx-footnote__number\" title=\"Footnote C.1.1\"><sup> 1 <\/sup><\/summary>\n<div class=\"ptx-footnote__contents\" id=\"tab-hypothesis-errors-1-1\">\n<div class=\"para\" id=\"tab-hypothesis-errors-1-1-1\">Table C.1.2 is adapted from [Harrington, 2011.]<div class=\"autopermalink\" data-description=\"Paragraph\"><a href=\"#tab-hypothesis-errors-1-1-1\" title=\"Copy heading and permalink for Paragraph\" aria-label=\"Copy heading and permalink for Paragraph\">🔗<\/a><\/div><\/div>\n<\/div><\/details>",
  "body": " Summary of Type I vs. Type II Errors   is adapted from Harrington, 2011.     type I error  type II error       Decision  is True  is False     Decide to reject      Type I error     ✔️      Decide to accept     ✔️     Type II error      "
},
{
  "id": "gls-main",
  "level": "1",
  "url": "gls-main.html",
  "type": "Glossary",
  "number": "",
  "title": "Glossary",
  "body": " Glossary   First-Principles Reasoning  first-principles reasoning   A method of reasoning in which claims, hypotheses, models, or systems are explicitly decomposed into their most fundamental, independently verifiable assumptions, and conclusions are derived via transparent, stepwise inference based on those assumptions. This helps ensure the fidelity of the reasoning process and that conclusions are traceable and reproducible by the reader.     Numerical Integration  numerical integration   Methods for approximating definite integrals.     Poisson Bracket  Poisson bracket   The Poisson bracket provides a fundamental operation in Hamiltonian mechanics and symplectic geometry. Specifically, it tells you how an observable changes due to some other observable acting as a generator.     Power Spectral Density  power spectral density   A power spectral density is a function describing how the power of a signal is distributed over frequency .     Regression Methods  regression methods   Methods for fitting models to data.     Root-Finding Algorithms  root-finding algorithms   Methods for solving equations of the form .    "
},
{
  "id": "gls-poisson-brackets-3-1",
  "level": "2",
  "url": "gls-main.html#gls-poisson-brackets-3-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Poisson bracket "
},
{
  "id": "gls-power-spectral-density-3-1",
  "level": "2",
  "url": "gls-main.html#gls-power-spectral-density-3-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "power spectral density "
},
{
  "id": "backmatter-6",
  "level": "1",
  "url": "backmatter-6.html",
  "type": "Index",
  "number": "",
  "title": "Index",
  "body": " Index   "
},
{
  "id": "appendix-bibliography",
  "level": "1",
  "url": "appendix-bibliography.html",
  "type": "References",
  "number": "",
  "title": "References",
  "body": "  Brunton, S. L., & Kutz, J. N. (2022). Data-Driven Science and Engineering: Machine Learning, Dynamical Systems, and Control . Cambridge University Press.  Faculty of Khan (2018). Introduction to Heat Transfer . YouTube.   Feynman, R. P., Leighton, R. B., & Sands, M. (1964, 2006, 2013). The Feynman Lectures on Physics, Vol. II, Ch. 15: The Vector Potential . California Institute of Technology.    Harrington, Mary (2011). The Design of Experiments in Neuroscience . (ed. 2) 2nd ed. SAGE Publications, Inc.  Hestenes, D. (1993). Hamiltonian Mechanics with Geometric Calculus, Clifford Algebras and Their Applications in Mathematical Physics (pp. 203-214). Springer.   Hestenes, D. (1998). Chapter 1: Synopsis of Geometric Algebra, New Foundations for Mathematical Physics (pp. 1-27). davidhestenes.net .     Paiva, C. R. (2005, August 31). Passive Lorentz transformations with spacetime algebra.  arXiv.org .   Physics with Elliot (2022). The Most Beautiful Result in Classical Mechanics . YouTube.   Schwartz, M. (2021). Lecture 6: Entropy . Harvard University.   "
},
{
  "id": "backmatter-8",
  "level": "1",
  "url": "backmatter-8.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": " This digital research journal was created using PreTeXt ( ). Built with the Zettelkasten method for networked mathematical thinking.   Version:    "
},
{
  "id": "backmatter-8-2",
  "level": "2",
  "url": "backmatter-8.html#backmatter-8-2",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Version: "
}
]

var ptx_lunr_idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('body')
  this.metadataWhitelist = ['position']

  ptx_lunr_docs.forEach(function (doc) {
    this.add(doc)
  }, this)
})

