var ptx_lunr_search_style = "textbook";
var ptx_lunr_docs = [
{
  "id": "preface",
  "level": "1",
  "url": "preface.html",
  "type": "Preface",
  "number": "",
  "title": "Preface",
  "body": " Preface    The Eigenscribe Framework  first-principles reasoning   The Eigenscribe framework is a structured appraoch to reasoning that aims to empower independent learning and research by emphasizing transparency and reporducibility. This is particularly important at the dawn of the AI era where the ability to sanity check is vital not onlyy the individual but for the fidelity of the scientific ecosystem as a whole.  At its core, the framework strives to enable responsible AI-assisted developing in a way that maximizes the benefits reaped from AI without sacrificing quality nor a human-supervised understanding of conclusions and systems derived. Rather than requiring that all ideas originate from fully reduced assumptions, the system allows exploratory and heuristic reasoning, which is progressively refined into formal, reproducible forms.     First-Principles Framework  first-principles  The Eigenscribe framework requires that assumptions are stated explicitly, inference steps remain traceable, and conclusions are reproducible and open to revision. Conceptual bridges across domains are established through shared rudimentary fundamentals (e.g., mathematical principles and physical laws). Analogy alone is not sufficient as a basis for establishing neither concepts nor conclusions.  This commitment to first-principles reasoning is designed to promote clarity, rigor, and intellectual honesty so that sanity checks can be performed independently by the reader, a vital step in the learning process that the lifeblood of science and engineering depend on. It is also intended to be compatible with my own personal exploratory and reasoning heuristic reasoning as I add content to 'There and Back Again' and other related projects.   Core Guidelines    Strive to always explicitly justify foundational assumptions based on grounded empirical observation, physical law, or formally defined axioms. Anything that is not explictly decomposed into foundational components must include a note alerting the reader along with a reputatble source and further readings that do go into foundatoinal derivations. This allows flexibility for me (the author) as I learn material myself and as I add content to There and Back Again, especialy in the beginning phase of compiling this work.  Each inferrentiable step is traceable such that intermmediate reasoning can be sanity checked, reproduced, and communicated to other learners.  Constructed bridges between domains are constructed from shared primitives. Analogy alone is never sufficient.  Derived results and conclusions remain falisifiable and can be independently verified by the reader. This enables irrative correction and refinement of both assumptions and conclusions.  AI usage must be transparent and documented where appropriate.       The Eigenscribe Framework will be routinely iterated over time.      Conventions   Mathematical Notation  A reference for mathematical notation used throughout the notes.     vector space  Vectors in the vector space  .     phase space  generalized coordinates  conjugate momenta  A point in phase space where represents the generalized coordinates and represents the conjugate momenta .  For this work, we will assume denotes the magnitude of the coordinate vector and denotes the magnitude of the momentum vector, respectively.     Poisson bracket  The Poisson bracket between two scalar functions and .      Abbreviations    GA  geometric algebra  Geometric Algebra    psd  positive semi-definite  positive semi-definite    PSD  power spectral density  power spectral density    PIML  Physics-Informed Machine Learning    PINN  Physics-Informed Neural Networks      "
},
{
  "id": "sub-methodology-4",
  "level": "2",
  "url": "preface.html#sub-methodology-4",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "first-principles reasoning "
},
{
  "id": "note-core-guidlines",
  "level": "2",
  "url": "preface.html#note-core-guidlines",
  "type": "Note",
  "number": "0.0.0.2",
  "title": "Core Guidelines.",
  "body": " Core Guidelines    Strive to always explicitly justify foundational assumptions based on grounded empirical observation, physical law, or formally defined axioms. Anything that is not explictly decomposed into foundational components must include a note alerting the reader along with a reputatble source and further readings that do go into foundatoinal derivations. This allows flexibility for me (the author) as I learn material myself and as I add content to There and Back Again, especialy in the beginning phase of compiling this work.  Each inferrentiable step is traceable such that intermmediate reasoning can be sanity checked, reproduced, and communicated to other learners.  Constructed bridges between domains are constructed from shared primitives. Analogy alone is never sufficient.  Derived results and conclusions remain falisifiable and can be independently verified by the reader. This enables irrative correction and refinement of both assumptions and conclusions.  AI usage must be transparent and documented where appropriate.    "
},
{
  "id": "sec-hamiltonian-noether",
  "level": "1",
  "url": "sec-hamiltonian-noether.html",
  "type": "Section",
  "number": "1.1",
  "title": "Hamiltonian Noether’s Theorem",
  "body": " Hamiltonian Noether's Theorem  Hamiltonian mechanics  Noether's theorem    Note ID: 202605020001 | Tags:  <Hamiltonian mechanics> , <Noether's theorem>     Conserved in time  conserved in time    A quantity is said to be conserved in time if    Two Interpretations:     is a constant along the flow of :      is invariant along the flow of (up to a minus sign). In other words, generates a symmetry of .         🏡 Take-Home Message:    🖇️ Linked Notes:   🔖 References:  Physics with Elliot: The Most Beautiful Result in Classical Physics    "
},
{
  "id": "sec-hamiltonian-noether-4-1",
  "level": "2",
  "url": "sec-hamiltonian-noether.html#sec-hamiltonian-noether-4-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Note ID: Tags: "
},
{
  "id": "def-conserved-in-time",
  "level": "2",
  "url": "sec-hamiltonian-noether.html#def-conserved-in-time",
  "type": "Definition",
  "number": "1.1.1",
  "title": "",
  "body": "  A quantity is said to be conserved in time if    Two Interpretations:     is a constant along the flow of :      is invariant along the flow of (up to a minus sign). In other words, generates a symmetry of .      "
},
{
  "id": "sec-entropy-taximony",
  "level": "1",
  "url": "sec-entropy-taximony.html",
  "type": "Section",
  "number": "1.2",
  "title": "Entropy Taximony",
  "body": " Entropy Taximony  entropy  clauseius entropy  boltzmann entropy  gibbs entropy  shannon entropy    Note ID: 202604110002 | Tags:  <thermodynamics> , <statistical mechanics> , <information theory>   A taxomony of entropy across various domains.    Entropy in Thermodynamics   Clausius Entropy   The Clausius entropy is a change in the entropy of a system due to some reversible process where it absobes some amount of heat at a constant temperature :       Entropy in Statistical Mechanics   Boltzmann Entropy   The Boltzmann entropy of a macroscopic system in a state with multiplicity is given by:      Gibbs Entropy   The Gibbs entropy of a macroscopic system is defined in terms of the probabilities of being in microstate :       Entropy in Information Theory    The Shannon entropy of a discrete random variable with possible outcomes where and corresponding probablities is defined as:       🖇️ Linked Notes:    🔖 References:  Lecture 6: Entropy    "
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
  "body": " Clausius Entropy   The Clausius entropy is a change in the entropy of a system due to some reversible process where it absobes some amount of heat at a constant temperature :    "
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
  "body": "  The Shannon entropy of a discrete random variable with possible outcomes where and corresponding probablities is defined as:    "
},
{
  "id": "sec-physics-and-geometric-algebra",
  "level": "1",
  "url": "sec-physics-and-geometric-algebra.html",
  "type": "Section",
  "number": "2.1",
  "title": "Geometric Algebra and Physics",
  "body": " Geometric Algebra and Physics   Exploring connections between geometric algebra and physics.    Physical Interpretations of the Wedge Product    Note ID: 202604110004 | Tags:  <geometric algebra> , <classical mechanics> , <vector calculus>     Wedge Product and Angular Momentum   The wedge product , as defined in capturing oriented area, analogous to angular momentum or flux in physical systems.     🖇️ Linked Notes:    🔖 References:  Hamiltonian Mechanics with Geometric Calculus     "
},
{
  "id": "subsec-wedge-product-and-physics-2-1",
  "level": "2",
  "url": "sec-physics-and-geometric-algebra.html#subsec-wedge-product-and-physics-2-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Note ID: Tags: "
},
{
  "id": "subsubsec-wedge-product-angular-momentum-2",
  "level": "2",
  "url": "sec-physics-and-geometric-algebra.html#subsubsec-wedge-product-angular-momentum-2",
  "type": "Claim",
  "number": "2.1.1",
  "title": "",
  "body": " The wedge product , as defined in capturing oriented area, analogous to angular momentum or flux in physical systems.  "
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
  "title": "Introductino to Quantum Computing with Qiskit",
  "body": " Introductino to Quantum Computing with Qiskit    Note ID: 202604120001 | Tags:  <tensor products> , <Qiskit> , <state vectors>     Problem Set 1   Imports   from quiskit.quantum_info import Statevector, Operator import numpy as np from numpy import sqrt from IPython.display import display, Latex, Math from qiskit import __version__ print(f\"Qiskit version: {__version__}\")     Tensor Products    Use Qiskit to compute the tensor product . Your solution must construct the state and print out the amplitudes in the computational basis.    Use   Statevector.from_label(\"-\") for    Statevector.from_label(\"r\") for        # Declare state vectors minus = Statevector.from_label(\"-\") plus_i = Statevector.from_label(\"r\") # Compute the tensor product and display the result display(minus.tensor(plus_i).draw(\"latex\"))          Given the state write the state vector ordering explicitly.    🎗️ Quiskit starts its indexing (qubit 0) from the right-hand side.     zero = Statevector([1, 0]) one = Statevector([0, 1]) plus = Statevector.from_label(\"+\") display((zero ^ one ^ plus).draw(\"latex\"))          "
},
{
  "id": "sec-qc-practice-set-1-2-1",
  "level": "2",
  "url": "sec-qc-practice-set-1.html#sec-qc-practice-set-1-2-1",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Note ID: Tags: "
},
{
  "id": "eg-tensor-products-2",
  "level": "2",
  "url": "sec-qc-practice-set-1.html#eg-tensor-products-2",
  "type": "Exercise",
  "number": "5.1.1",
  "title": "",
  "body": "  Use Qiskit to compute the tensor product . Your solution must construct the state and print out the amplitudes in the computational basis.    Use   Statevector.from_label(\"-\") for    Statevector.from_label(\"r\") for        # Declare state vectors minus = Statevector.from_label(\"-\") plus_i = Statevector.from_label(\"r\") # Compute the tensor product and display the result display(minus.tensor(plus_i).draw(\"latex\"))       "
},
{
  "id": "eg-tensor-products-3",
  "level": "2",
  "url": "sec-qc-practice-set-1.html#eg-tensor-products-3",
  "type": "Exercise",
  "number": "5.1.2",
  "title": "",
  "body": "  Given the state write the state vector ordering explicitly.    🎗️ Quiskit starts its indexing (qubit 0) from the right-hand side.     zero = Statevector([1, 0]) one = Statevector([0, 1]) plus = Statevector.from_label(\"+\") display((zero ^ one ^ plus).draw(\"latex\"))       "
},
{
  "id": "sec-git",
  "level": "1",
  "url": "sec-git.html",
  "type": "Section",
  "number": "6.1",
  "title": "Terminal Cheat Sheet",
  "body": " Terminal Cheat Sheet    Note ID: 202604120002 | Tags:  <git>  <bash>  <terminal>     Local Git Reset  Multiline version (safter, less likely to accidentally earase local changes):   git fetch origin git checkout main # or whatever branch you're using git reset --hard origin\/main git clean -fd # removes untracked files & folders   One-liner (⚠️ use with caution!):   git fetch origin && git reset --hard origin\/main && git clean -fd     Update pip requirements.txt   pip install -r requirements.txt --upgrade pip freeze > requirements.txt    "
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
  "number": "7.1",
  "title": "Python Gold Standards",
  "body": " Python Gold Standards  python    Note ID: 202605080001 | Tags:  <python>     Python Rule of Thumb   The primary goal is to routinely write scripts that read like math and code.  If someone scrolls your script top-to-bottom, the conceptual story should flow:  What exists?  What are you allowed to call?  How does it work?  Proof it works.       Gold Standard Python Template   # src\/example.py \"\"\" Script descriptiion Author: Date: \"\"\" # imports and typing __future__ import annotations # Type hinting __all__ = [\"public_function\"] # Explicitly declare public API # ----------------------------------------------------------------------------------------------------------- # 0️⃣ Typing helpers \/ protocols \/ constants (if needed) # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 1️⃣ Core definitions # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 2️⃣ Public API (functions users are meant to call) # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 3️⃣ Private helpers # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 4️⃣ Smoke tests \/ example usage # ----------------------------------------------------------------------------------------------------------- # ----------------------------------------------------------------------------------------------------------- # 5️⃣ Entry point # -----------------------------------------------------------------------------------------------------------     Fundamental Features   Numbered Emoji Sectioning    Helps to make long scripts scannable.  Meant to be used as semantic anchor points, not decoration.      if name == \"__main__\"    Placed at the bottom of the script.   ✔️ Only use for:  Running smoke tests.  Minimal demonstrations.  Sanity checks.      ❌ Never use for:  Running large-scale experiments.  Running training loops.  Running inference pipelines.         def main() -> None:    Always exists.  Orchestrates calls to public API for smoke tests, demos, sanity checks.  Never contains math or logic explicitly.     def main() -> None: _smoke_test()     \"Big functions\" to bundle logic.  Use large functions to bundle related logic together.    Type Annotations Everywhere (within reason)  🔑 Key Habits to Remember:  Use Tensor , not torch.Tensor , in type annotations.  Annotate scalars ( float | Tensor ) when physically meaningul.   Use Final for constants:   omega: float | Final[Tensor] = 1.0        NumPy-Style Docstrings  These should always be present on:  public functions.  public classes.  nontrivial private helpers.       Minimal viable structure:   def public_function(x: Tensor) -> Tensor: \"\"\" Short description. Parameters ---------- x : Tensor Description of x. Returns ------- Tensor Description of return value. \"\"\" pass        "
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
  "id": "subsec-python-rule-of-thumb-2",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-python-rule-of-thumb-2",
  "type": "Note",
  "number": "7.1.1",
  "title": "",
  "body": " The primary goal is to routinely write scripts that read like math and code.  If someone scrolls your script top-to-bottom, the conceptual story should flow:  What exists?  What are you allowed to call?  How does it work?  Proof it works.    "
},
{
  "id": "subsec-key-features-2",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-2",
  "type": "Note",
  "number": "7.1.2",
  "title": "Numbered Emoji Sectioning.",
  "body": " Numbered Emoji Sectioning    Helps to make long scripts scannable.  Meant to be used as semantic anchor points, not decoration.    "
},
{
  "id": "subsec-key-features-3",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-3",
  "type": "Note",
  "number": "7.1.3",
  "title": "<code class=\"code-inline tex2jax_ignore\">if name == \"__main__\"<\/code>.",
  "body": " if name == \"__main__\"    Placed at the bottom of the script.   ✔️ Only use for:  Running smoke tests.  Minimal demonstrations.  Sanity checks.      ❌ Never use for:  Running large-scale experiments.  Running training loops.  Running inference pipelines.       "
},
{
  "id": "subsec-key-features-4",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-4",
  "type": "Note",
  "number": "7.1.4",
  "title": "<code class=\"code-inline tex2jax_ignore\">def main() -&gt; None:<\/code>.",
  "body": " def main() -> None:    Always exists.  Orchestrates calls to public API for smoke tests, demos, sanity checks.  Never contains math or logic explicitly.     def main() -> None: _smoke_test()   "
},
{
  "id": "subsec-key-features-5",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-5",
  "type": "Note",
  "number": "7.1.5",
  "title": "\"Big functions\" to bundle logic..",
  "body": " \"Big functions\" to bundle logic.  Use large functions to bundle related logic together.  "
},
{
  "id": "subsec-key-features-6",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-6",
  "type": "Note",
  "number": "7.1.6",
  "title": "Type Annotations Everywhere (within reason).",
  "body": " Type Annotations Everywhere (within reason)  🔑 Key Habits to Remember:  Use Tensor , not torch.Tensor , in type annotations.  Annotate scalars ( float | Tensor ) when physically meaningul.   Use Final for constants:   omega: float | Final[Tensor] = 1.0      "
},
{
  "id": "subsec-key-features-7",
  "level": "2",
  "url": "sec-python-gold-standards.html#subsec-key-features-7",
  "type": "Note",
  "number": "7.1.7",
  "title": "NumPy-Style Docstrings.",
  "body": " NumPy-Style Docstrings  These should always be present on:  public functions.  public classes.  nontrivial private helpers.       Minimal viable structure:   def public_function(x: Tensor) -> Tensor: \"\"\" Short description. Parameters ---------- x : Tensor Description of x. Returns ------- Tensor Description of return value. \"\"\" pass      "
},
{
  "id": "gls-main",
  "level": "1",
  "url": "gls-main.html",
  "type": "Glossary",
  "number": "",
  "title": "Glossary",
  "body": " Glossary   First-Principles Reasoning  first-principles reasoning   A method of reasoning in which claims, hypotheses, models, or systems are explicitly decomposed into their most fundamental, independently verifiable assumptions, and conclusions are derived via transparent, stepwise inferece based on those assumptions . This helps ensure the fidelity of the reasoning process and that conclusions are traceable and reproducible by the reader.     Numerical Integration  numerical integration   Methods for approximating definite integrals.     Poisson Bracket  Poisson bracket  The Poisson bracket provides a fundamental operation in Hamiltonian mechanics and symplectic geometry.    Power Spectral Density  power spectral density  A power spectral density is a function describing how the power of a signal is distributed over frequency .    Regression Methods  regression methods   Methods for fitting models to data.    xml:id=\"gls-root-finding\"> Root-Finding Algorithms  root-finding algorithms  Methods for solving equations of the form \\(f(x) = 0\\).   "
},
{
  "id": "gls-poisson-brackets-3",
  "level": "2",
  "url": "gls-main.html#gls-poisson-brackets-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "Poisson bracket "
},
{
  "id": "gls-power-spectral-density-3",
  "level": "2",
  "url": "gls-main.html#gls-power-spectral-density-3",
  "type": "Paragraph (with a defined term)",
  "number": "",
  "title": "",
  "body": "power spectral density "
},
{
  "id": "backmatter-3",
  "level": "1",
  "url": "backmatter-3.html",
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
  "body": "  Brunton, S. L., & Kutz, J. N. (2022). Data-Driven Science and Engineering: Machine Learning, Dynamical Systems, and Control . Cambridge University Press.  Faculty of Khan (2018). Introduction to Heat Transfer . YouTube.   Feynman, R. P., Leighton, R. B., & Sands, M. (1964, 2006, 2013). The Feynman Lectures on Physics, Vol. II, Ch. 15: The Vector Potential . California Institute of Technology.    Hestenes, D. (1993). Hamiltonian Mechanics with Geometric Calculus, Clifford Algebras and Their Applications in Mathematical Physics (pp. 203-214). Springer.   Hestenes, D. (1998). Chapter 1: Synopsis of Geometric Algebra, New Foundations for Mathematical Physics (pp. 1-27). davidhestenes.net .     Paiva, C. R. (2005, August 31). Passive Lorentz transformations with spacetime algebra.  arXiv.org .   Physics with Elliot (2022). The Most Beautiful Result in Classical Mechanics . YouTube.   Schwartz., M. (2021). Lecture 6: Entropy . Harvard University.   "
},
{
  "id": "backmatter-5",
  "level": "1",
  "url": "backmatter-5.html",
  "type": "Colophon",
  "number": "",
  "title": "Colophon",
  "body": " This digital research journal was created using PreTeXt ( ). Built with the Zettelkasten method for networked mathematical thinking.   Version:    "
},
{
  "id": "backmatter-5-2",
  "level": "2",
  "url": "backmatter-5.html#backmatter-5-2",
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
